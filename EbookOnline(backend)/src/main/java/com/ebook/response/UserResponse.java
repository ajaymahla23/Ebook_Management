package com.ebook.response;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ebook.entity.MyOrderBook;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class UserResponse {

	private String userId;
	@NotBlank(message = "Name is required")
	private String name;
	@Column(unique = true, nullable = false)
	@Email(message = "Invalid email")
	private String email;
	@NotBlank(message = "Password is required")
	private String password;
	private String phoneNo;
	private String profilePic;
	private MultipartFile file;
	private String message;

	private List<MyOrderBook> myOrderBookList;

}
