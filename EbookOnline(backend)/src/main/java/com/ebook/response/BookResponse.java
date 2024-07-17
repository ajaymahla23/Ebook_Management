package com.ebook.response;

import java.util.List;

import com.ebook.entity.BookDetails;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class BookResponse {

	private List<BookDetails> newBooks;
	private List<BookDetails> oldBooks;
	private List<BookDetails> recentBooks;

}
