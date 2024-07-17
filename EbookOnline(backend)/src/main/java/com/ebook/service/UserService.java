package com.ebook.service;

import java.io.IOException;
import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.ebook.entity.User;
import com.ebook.response.UserResponse;

import jakarta.servlet.http.HttpSession;

public interface UserService {

	public User saveUser(UserResponse userDto);

	public ResponseEntity<byte[]> getUserProfile(String profilePic) throws IOException;

	public User updateUser(User currentUser, User newUserData, String providedPassword, MultipartFile file,
			HttpSession session);

	public UserResponse getUserInfoAndOrders(Principal principal);
	
//	public UserDto updateUser(User currentUser, User newUserData, String providedPassword, MultipartFile file,
//			HttpSession session);

}
