package com.ebook.repo;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ebook.entity.BookDetails;

public interface BookDetailRepo extends JpaRepository<BookDetails, String> {

	boolean existsByBookId(String bookId);

	Page<BookDetails> findByStatusAndBookCategory(String status, String bookCategory, Pageable pageable);

	Page<BookDetails> findByStatus(String status, Pageable pageable);

	Page<BookDetails> findByUserId(String userId, Pageable pageable);

	List<BookDetails> findByBookNameOrAuthorOrBookCategoryContainsAndStatus(String bookName, String author,
			String bookCategory, String status);
}
