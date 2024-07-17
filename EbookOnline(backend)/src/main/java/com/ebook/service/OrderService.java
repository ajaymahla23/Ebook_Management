package com.ebook.service;

import java.security.Principal;

import org.springframework.http.ResponseEntity;

public interface OrderService {

	public ResponseEntity<String> purchaseBook(String orderData, Double totalCartAmount, Principal principal);

}
