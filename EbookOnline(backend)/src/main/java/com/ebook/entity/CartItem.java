package com.ebook.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class CartItem {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer cartId;
	private Date date;
	private String bookId;
	private String userId;
	private String bookName;
	private String author;
	private Double price;
	private Double totalPrice;
	private String bookImg;
	@Column(length = 1)
	private String bookCategory;
	private Long qty = 1L;
}
