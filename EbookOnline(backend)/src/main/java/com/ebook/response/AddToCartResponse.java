package com.ebook.response;

import java.util.List;

import com.ebook.entity.BookDetails;
import com.ebook.entity.CartItem;
import com.ebook.entity.User;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AddToCartResponse {

	private Integer cartId;
	private String message;
	private CartItem cartItem;
	private BookDetails bookDetails;
	private String bookName;
	private String author;
	private Double price;
	private String bookImg;
	private String bookCategory;
	private Double totalCartAmount;
	private List<CartItem> cartItemList;
	private User user;
}
