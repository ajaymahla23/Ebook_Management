package com.ebook.repo;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ebook.entity.MyOrderBook;

public interface MyOrderBookRepo extends JpaRepository<MyOrderBook, Integer> {

	boolean existsByOrderId(String orderId);

	List<MyOrderBook> findByEmail(String email);

	Page<MyOrderBook> findByUserId(String userId, Pageable pageable);

}
