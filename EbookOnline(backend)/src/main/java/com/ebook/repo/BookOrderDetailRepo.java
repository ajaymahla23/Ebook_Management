package com.ebook.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ebook.entity.BookOrderDetail;
import com.ebook.entity.MyOrderBook;

public interface BookOrderDetailRepo extends JpaRepository<BookOrderDetail, String> {

	List<BookOrderDetail> findByMyOrderBook(MyOrderBook book);

}
