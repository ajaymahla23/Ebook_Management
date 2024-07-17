package com.ebook.serviceImpl;

import java.security.Principal;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ebook.entity.BookOrderDetail;
import com.ebook.entity.CartItem;
import com.ebook.entity.MyOrderBook;
import com.ebook.entity.User;
import com.ebook.repo.BookOrderDetailRepo;
import com.ebook.repo.CartItemRepo;
import com.ebook.repo.MyOrderBookRepo;
import com.ebook.repo.UserRepo;
import com.ebook.service.OrderService;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class OrderServiceImpl implements OrderService {
	@Autowired
	private BookOrderDetailRepo bookOrderRepo;
	@Autowired
	private MyOrderBookRepo myOrderBookRepo;
	@Autowired
	private UserRepo userRepo;
	@Autowired
	private CartItemRepo cartItemRepo;

	@Autowired
	private ObjectMapper objectMapper;

	@Override
	public ResponseEntity<String> purchaseBook(String orderData, Double totalCartAmount, Principal principal) {
		User user = userRepo.findByEmail(principal.getName()).orElse(null);
		try {
			List<CartItem> cartItemList = cartItemRepo.findByUserId(user.getUserId());
			MyOrderBook myBookOrder = objectMapper.readValue(orderData, MyOrderBook.class);
			if (myBookOrder.getPaymentType() != null) {
				Random random = new Random(1000);
				myBookOrder.setOrderId("ORD-" + String.valueOf(random.nextInt()));
				while (myOrderBookRepo.existsByOrderId(myBookOrder.getOrderId())) {
					String newRandomNo = String.valueOf(random.nextInt());
					myBookOrder.setOrderId("ORD-" + newRandomNo);
				}
				myBookOrder.setDate(new Date());
				myBookOrder.setEmail(user.getEmail());
				myBookOrder.setUsername(user.getName());
				myBookOrder.setPhoneNo(user.getPhoneNo());
				myBookOrder.setTotalOrderAmt(totalCartAmount);
				myBookOrder.setUserId(user.getUserId());
				myOrderBookRepo.save(myBookOrder);
				for (CartItem cart : cartItemList) {
					BookOrderDetail bookOrder = new BookOrderDetail();
					bookOrder.setId(UUID.randomUUID().toString());
					while (bookOrderRepo.existsById(bookOrder.getId())) {
						bookOrder.setId(UUID.randomUUID().toString());
					}
					bookOrder.setAuthor(cart.getAuthor());
					bookOrder.setBookName(cart.getBookName());
					bookOrder.setPrice(cart.getPrice());
					bookOrder.setTotaQty(cart.getQty());
					bookOrder.setMyOrderBook(myBookOrder);
					bookOrderRepo.save(bookOrder);
				}
				cartItemRepo.deleteAll(cartItemList);
				return ResponseEntity.ok("Order processed successfully");
			} else {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please select payment option");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().body("Invalid order data");
		}

	}

}
