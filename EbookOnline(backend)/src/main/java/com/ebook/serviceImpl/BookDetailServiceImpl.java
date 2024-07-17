package com.ebook.serviceImpl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ebook.entity.BookDetails;
import com.ebook.entity.BookOrderDetail;
import com.ebook.entity.CartItem;
import com.ebook.entity.MyOrderBook;
import com.ebook.entity.User;
import com.ebook.helper.Helper;
import com.ebook.repo.BookDetailRepo;
import com.ebook.repo.BookOrderDetailRepo;
import com.ebook.repo.CartItemRepo;
import com.ebook.repo.MyOrderBookRepo;
import com.ebook.repo.UserRepo;
import com.ebook.response.AddToCartResponse;
import com.ebook.response.BookResponse;
import com.ebook.response.OrderResponse;
import com.ebook.service.BookDetailService;

@Service
public class BookDetailServiceImpl implements BookDetailService {
	@Autowired
	private BookDetailRepo bookDetailRepo;
	@Autowired
	private CartItemRepo cartItemRepo;
	@Autowired
	private UserRepo userRepo;
	@Autowired
	private BookOrderDetailRepo bookOrderRepo;
	@Autowired
	private MyOrderBookRepo myOrderBookRepo;
	@Autowired
	private ModelMapper modelMapper;

	@Value("${ebook.book.images}")
	private String uploadBookImages;

	@Override
	public BookDetails saveBookDetail(BookDetails bookDetails, MultipartFile file, Principal principal)
			throws IOException {
		User user = userRepo.findByEmail(principal.getName()).orElse(null);
		String bookId = UUID.randomUUID().toString();
		bookDetails.setBookId(bookId);
		bookDetails.setUserId(user.getUserId());
		while (bookDetailRepo.existsByBookId(bookDetails.getBookId())) {
			bookId = UUID.randomUUID().toString();
			bookDetails.setBookId(bookId);
		}
		bookDetails.setDate(new Date());
		if (file.isEmpty()) {
			bookDetails.setBookImg(null);
		} else {
			uploadBookImages = uploadBookImages.trim().replaceAll("\\s", "");
			Helper.uploadBookImg(file, uploadBookImages, bookDetails);
		}
		return bookDetailRepo.save(bookDetails);
	}

	@Override
	public Page<BookDetails> getBookList() {
		Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE, Sort.by("bookId").descending());
		Page<BookDetails> pageContent = bookDetailRepo.findAll(pageable);
		return pageContent;
	}

	@Override
	public ResponseEntity<byte[]> getBookImage(String imageName) throws IOException {
		uploadBookImages = uploadBookImages.trim().replaceAll("\\s", "");
		Path path = Paths.get(uploadBookImages, imageName);
		byte[] imgBytes = Files.readAllBytes(path);
		return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imgBytes);
	}

	@Override
	public BookDetails updateBookDetail(String bookId, BookDetails bookDetails, MultipartFile file) throws IOException {
		BookDetails existingBookDetail = bookDetailRepo.findById(bookId)
				.orElseThrow(() -> new IllegalArgumentException("Book not found with id: " + bookId));
		if (file != null) {
			uploadBookImages = uploadBookImages.trim().replaceAll("\\s", "");
			Helper.uploadBookImg(file, uploadBookImages, existingBookDetail);
		}
		existingBookDetail.setAuthor(bookDetails.getAuthor());
		existingBookDetail.setBookCategory(bookDetails.getBookCategory());
		existingBookDetail.setBookName(bookDetails.getBookName());
		existingBookDetail.setPrice(bookDetails.getPrice());
		existingBookDetail.setStatus(bookDetails.getStatus());
		return bookDetailRepo.save(existingBookDetail);
	}

	@Override
	public Page<BookDetails> viewCategoryWiseBooks(String bookCategory) {
		Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE, Sort.by("date").descending());
		Page<BookDetails> bookDetails = null;
		switch (bookCategory) {
		case "New" -> bookDetails = bookDetailRepo.findByStatusAndBookCategory("Y", "N", pageable);
		case "Old" -> bookDetails = bookDetailRepo.findByStatusAndBookCategory("Y", "O", pageable);
		case "recent" -> bookDetails = bookDetailRepo.findByStatus("Y", pageable);
		default -> throw new IllegalArgumentException("Unexpected value: " + bookCategory);
		}
		return bookDetails;
	}

//	@Override
//	public BookResponse viewUserHome() {
//		Pageable pageable = PageRequest.of(0, 5, Sort.by("bookId").descending());
//		Page<BookDetails> pageContent = bookDetailRepo.findByStatus("Y", pageable);
//		List<BookDetails> newBooks = pageContent.stream().filter(book -> book.getBookCategory().equals("N"))
//				.collect(Collectors.toList());
//		List<BookDetails> oldBooks = pageContent.stream().filter(book -> book.getBookCategory().equals("O"))
//				.collect(Collectors.toList());
//		List<BookDetails> recentBooks = bookDetailRepo
//				.findByStatus("Y", PageRequest.of(0, 5, Sort.by("date").descending())).getContent();
//		BookResponse bookResponse = new BookResponse(newBooks, oldBooks, recentBooks);
//		return bookResponse;
//	}

	@Override
	public BookResponse viewUserHome() {
		Pageable pageable = PageRequest.of(0, 5, Sort.by("bookId").descending());
		Page<BookDetails> bookDetailPage = bookDetailRepo.findByStatus("Y", pageable);
		List<BookDetails> newBooks = new ArrayList<>();
		List<BookDetails> oldBooks = new ArrayList<>();
		bookDetailPage.forEach(book -> {
			if ("N".equals(book.getBookCategory())) {
				newBooks.add(book);
			} else if ("O".equals(book.getBookCategory())) {
				oldBooks.add(book);
			}
		});
		List<BookDetails> recentBooks = bookDetailRepo
				.findByStatus("Y", PageRequest.of(0, 5, Sort.by("date").descending())).getContent();
		return new BookResponse(newBooks, oldBooks, recentBooks);
	}

	@Override
	public AddToCartResponse addToCart(String bookId, Principal principal) {
		BookDetails details = bookDetailRepo.findById(bookId).orElse(null);
		User user = userRepo.findByEmail(principal.getName())
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));
		CartItem cartItem = cartItemRepo.findByBookIdAndUserId(bookId, user.getUserId());
		String message;
		if (cartItem != null) {
			Long newQty = cartItem.getQty() + 1L;
			double newTotalPrice = cartItem.getPrice() * newQty;
			cartItem.setTotalPrice(newTotalPrice);
			cartItem.setQty(newQty);
			message = "Item quantity updated successfully!";
		} else {
			cartItem = modelMapper.map(details, CartItem.class);
			cartItem.setDate(new Date());
			cartItem.setTotalPrice(details.getPrice());
			cartItem.setUserId(user.getUserId());
			message = "Item added to cart successfully!";
		}
		cartItemRepo.save(cartItem);
		AddToCartResponse response = modelMapper.map(details, AddToCartResponse.class);
		response.setCartItem(cartItem);
		response.setMessage(message);
		return response;
	}

	@Override
	public AddToCartResponse viewCheckout(Principal principal) {
		Pageable pageable = PageRequest.of(0, 5, Sort.by("date").descending());
		User user = userRepo.findByEmail(principal.getName())
				.orElseThrow(() -> new UsernameNotFoundException("User not found"));
		List<CartItem> cartItemList = cartItemRepo.findByUserId(user.getUserId(), pageable).getContent();
		double totalAmout = 0;
		for (CartItem item : cartItemList) {
			totalAmout += item.getTotalPrice();
		}
		AddToCartResponse response = new AddToCartResponse();
		response.setCartItemList(cartItemList);
		response.setTotalCartAmount(totalAmout);
		response.setUser(user);
		return response;
	}

	@Override
	public OrderResponse viewYourOrder(String userId) {
		User user = userRepo.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found"));
		List<MyOrderBook> myOrderBookList = myOrderBookRepo.findByEmail(user.getEmail());
		List<BookOrderDetail> bookOrderDetailList = new ArrayList<>();
		for (MyOrderBook book : myOrderBookList) {
			bookOrderDetailList.addAll(bookOrderRepo.findByMyOrderBook(book));
		}
		OrderResponse response = new OrderResponse();
		response.setBookOrderList(bookOrderDetailList);
		response.setMyOrderBookList(myOrderBookList);
		return response;
	}

}
