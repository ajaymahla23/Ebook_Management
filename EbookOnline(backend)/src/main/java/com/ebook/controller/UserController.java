package com.ebook.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ebook.entity.BookDetails;
import com.ebook.entity.User;
import com.ebook.repo.BookDetailRepo;
import com.ebook.repo.CartItemRepo;
import com.ebook.repo.UserRepo;
import com.ebook.response.AddToCartResponse;
import com.ebook.response.BookResponse;
import com.ebook.response.OrderResponse;
import com.ebook.response.UserResponse;
import com.ebook.service.BookDetailService;
import com.ebook.service.OrderService;
import com.ebook.service.UserService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/ebook/user")
@Tag(name="UserController",description = "this is user controller")
public class UserController {
	@Autowired
	private BookDetailRepo bookDetailRepo;
	@Autowired
	private BookDetailService bookDetailService;
	@Autowired
	private CartItemRepo cartItemRepo;
	@Autowired
	private UserRepo userRepo;
	@Autowired
	private UserService userService;
	@Autowired
	private OrderService orderService;

	@GetMapping("/home")
	public ResponseEntity<BookResponse> viewUserHome() {
		BookResponse bookResponse = bookDetailService.viewUserHome();
		return ResponseEntity.status(HttpStatus.OK).body(bookResponse);
	}

	@GetMapping("/detail/{bookId}")
	public ResponseEntity<BookDetails> viewBookDetail(@PathVariable String bookId) {
		BookDetails bookDetail = bookDetailRepo.findById(bookId).orElse(null);
		return ResponseEntity.status(HttpStatus.OK).body(bookDetail);
	}

	@GetMapping("/book/{bookCategory}")
	public ResponseEntity<Page<BookDetails>> viewCategoryWiseBooks(@PathVariable String bookCategory) {
		Page<BookDetails> bookDetails = bookDetailService.viewCategoryWiseBooks(bookCategory);
		return ResponseEntity.status(HttpStatus.OK).body(bookDetails);
	}

	@PostMapping("/addToCart/{bookId}")
	public ResponseEntity<AddToCartResponse> addToCart(@PathVariable String bookId, Principal principal) {
		AddToCartResponse response = bookDetailService.addToCart(bookId, principal);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/checkout")
	public ResponseEntity<AddToCartResponse> viewCheckout(Principal principal) {
		AddToCartResponse response = bookDetailService.viewCheckout(principal);
		return ResponseEntity.ok(response);
	}

	@DeleteMapping("/delete/{cartId}")
	public ResponseEntity<String> removeCartItem(@PathVariable Integer cartId) {
		cartItemRepo.deleteById(cartId);
		return ResponseEntity.ok("Cart item with ID " + cartId + " deleted successfully.");
	}

	@GetMapping("/old-books")
	public ResponseEntity<List<BookDetails>> viewOldBooks(Principal principal) {
		User user = userRepo.findByEmail(principal.getName()).orElse(null);
		Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE, Sort.by("date").descending());
		List<BookDetails> bookDetails = bookDetailRepo.findByUserId(user.getUserId(), pageable).getContent();
		return ResponseEntity.status(HttpStatus.OK).body(bookDetails);
	}

	@GetMapping("/edit-profile")
	public ResponseEntity<User> editProfile(Principal principal) {
		User user = userRepo.findByEmail(principal.getName()).orElse(null);
		return ResponseEntity.status(HttpStatus.CREATED).body(user);
	}

	@PutMapping("/update_profile")
	public ResponseEntity<Map<String, Object>> updateUserProfile(@RequestPart("userDetail") User newUserData,
			@RequestPart("password") String providedPassword,
			@RequestPart(value = "bookImage", required = false) MultipartFile file, HttpSession session,
			Principal principal) {
		User currentUser = userRepo.findByEmail(principal.getName()).orElse(null);
		User updateUser = userService.updateUser(currentUser, newUserData, providedPassword, file, session);
		Map<String, Object> response = new HashMap<>();
		response.put("user", updateUser);
		response.put("message", session.getAttribute("message"));
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	@PostMapping("/buy")
	public ResponseEntity<String> purchaseBook(@RequestParam("orderData") String orderData,
			@RequestParam("totalCartAmount") Double totalCartAmount, Principal principal) {
		return orderService.purchaseBook(orderData, totalCartAmount, principal);

	}

	@GetMapping("/your_order")
	public ResponseEntity<OrderResponse> viewYourOrder(Principal principal) {
		User user = userRepo.findByEmail(principal.getName()).orElse(null);
		OrderResponse response = bookDetailService.viewYourOrder(user.getUserId());
		return ResponseEntity.ok(response);
	}

	@GetMapping("/search/{keyword}")
	public ResponseEntity<?> searchBook(@PathVariable String keyword) {
		List<BookDetails> bookDetails = bookDetailRepo.findByBookNameOrAuthorOrBookCategoryContainsAndStatus(keyword,
				keyword, keyword, "Y");
		return ResponseEntity.ok(bookDetails);
	}

	@GetMapping("/view_profile")
	public ResponseEntity<UserResponse> viewUserProfile(Principal principal) {
		UserResponse response = userService.getUserInfoAndOrders(principal);
		return ResponseEntity.ok(response);
	}

	@DeleteMapping("/delete_user/{userId}")
	public ResponseEntity<?> deleteUser(@PathVariable String userId) {
		User user = userRepo.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found"));
		user.getRoles().clear();
		userRepo.save(user);
		userRepo.delete(user);
		return ResponseEntity.ok("user id deleted successfully :" + userId);
	}

}
