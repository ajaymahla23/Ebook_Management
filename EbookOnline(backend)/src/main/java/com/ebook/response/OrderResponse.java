package com.ebook.response;

import java.util.List;

import com.ebook.entity.BookOrderDetail;
import com.ebook.entity.MyOrderBook;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class OrderResponse {

	private List<MyOrderBook> myOrderBookList;
	private List<BookOrderDetail> bookOrderList;

}
