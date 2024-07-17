package com.ebook.controller;

import java.io.IOException;
import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ebook.entity.BookDetails;
import com.ebook.repo.BookDetailRepo;
import com.ebook.service.BookDetailService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/ebook/admin")
@CrossOrigin(origins = "http://localhost:5173")
@Tag(name="Admin Controller",description = "this is admin controller")
public class EbookController {
	@Autowired
	private BookDetailService bookDetailService;
	@Autowired
	private BookDetailRepo bookDetailRepo;

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<BookDetails> addBookDetail(@RequestPart("bookDetails") BookDetails bookDetails,
			@RequestPart("bookImage") MultipartFile file, Principal principal) throws IOException {
		BookDetails saveBookDetails = bookDetailService.saveBookDetail(bookDetails, file, principal);
		return ResponseEntity.status(HttpStatus.CREATED).body(saveBookDetails);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/list")
	@Operation(summary = "get all books",tags = {"ebook-controller"})
	public ResponseEntity<Page<BookDetails>> bookList() {
		Page<BookDetails> bookList = bookDetailService.getBookList();
		return ResponseEntity.status(HttpStatus.OK).body(bookList);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping("/delete/{bookId}")
	public ResponseEntity<?> deleteBook(@PathVariable String bookId) {
		try {
			bookDetailRepo.deleteById(bookId);
			return ResponseEntity.ok("Deleted successfully: id " + bookId);
		} catch (EmptyResultDataAccessException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Book with id " + bookId + " not found");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error deleting book with id " + bookId);
		}
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/edit/{bookId}")
	public ResponseEntity<BookDetails> editBookDetail(@PathVariable String bookId) {
		BookDetails bookDetail = bookDetailRepo.findById(bookId).orElse(null);
		if (bookDetail == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().body(bookDetail);
	}

	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PutMapping("/update/{bookId}")
	public ResponseEntity<BookDetails> updateBookDetail(@PathVariable String bookId,
			@RequestPart("bookDetails") BookDetails bookDetails,
			@RequestPart(value = "bookImage", required = false) MultipartFile file) throws IOException {
		BookDetails updateBookDetail = bookDetailService.updateBookDetail(bookId, bookDetails, file);
		return ResponseEntity.status(HttpStatus.OK).body(updateBookDetail);
	}

}
