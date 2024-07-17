package com.ebook.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class BookOrderDetail {

	@Id
	private String id;
	private String bookName;
	private String author;
	private Double price;
	private Long totaQty;
	
	@JsonBackReference
	@ManyToOne
	@JoinColumn(name = "myOrderBook_id")
	private MyOrderBook myOrderBook;
}
