package com.ebook.service;

import java.io.IOException;
import java.security.Principal;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.ebook.entity.BookDetails;
import com.ebook.response.AddToCartResponse;
import com.ebook.response.BookResponse;
import com.ebook.response.OrderResponse;

public interface BookDetailService {

	public BookDetails saveBookDetail(BookDetails bookDetails, MultipartFile file, Principal principal) throws IOException;

	public Page<BookDetails> getBookList();

	public ResponseEntity<byte[]> getBookImage(String imageName) throws IOException;

	public BookDetails updateBookDetail(String bookId, BookDetails bookDetails, MultipartFile file) throws IOException;

	public Page<BookDetails> viewCategoryWiseBooks(String bookCategory);

	public BookResponse viewUserHome();

	public AddToCartResponse addToCart(String bookId, Principal principal);

	public AddToCartResponse viewCheckout(Principal principal);

	public OrderResponse viewYourOrder(String userId);

}
