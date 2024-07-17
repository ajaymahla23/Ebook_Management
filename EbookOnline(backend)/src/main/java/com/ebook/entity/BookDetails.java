package com.ebook.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookDetails {

	@Id
	private String bookId;
	private Date date;
	private String bookName;
	private String author;
	private Double price;

	@Column(length = 1)
	private String bookCategory;
	@Column(length = 1)
	private String status = "Y";
	private String bookImg;
	private String about;
	private String userId;

}
