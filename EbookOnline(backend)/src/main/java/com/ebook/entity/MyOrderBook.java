package com.ebook.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class MyOrderBook {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String orderId;
	private Date date;
	private String username;
	private String email;
	private String phoneNo;
	private String paymentType;
	private String address;
	private String landmark;
	private String city;
	private String state;
	private String pincode;
	private Double totalOrderAmt;
	private String userId;

	@JsonManagedReference
	@OneToMany(mappedBy = "myOrderBook", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<BookOrderDetail> bookOrderList = new ArrayList<>();

}
