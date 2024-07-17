package com.ebook.repo;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ebook.entity.CartItem;

public interface CartItemRepo extends JpaRepository<CartItem, Integer> {

	public CartItem findByBookIdAndUserId(String bookId, String userId);

	public Page<CartItem> findByUserId(String userId, Pageable pageable);

	public List<CartItem> findByUserId(String userId);

}
