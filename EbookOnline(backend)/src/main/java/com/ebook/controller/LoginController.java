package com.ebook.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ebook.exception.UserAlreadyExistsException;
import com.ebook.jwt.JwtUtils;
import com.ebook.response.AuthRequest;
import com.ebook.response.BookResponse;
import com.ebook.response.JwtResponse;
import com.ebook.response.UserResponse;
import com.ebook.security.CustomUserDetail;
import com.ebook.service.BookDetailService;
import com.ebook.service.UserService;

import jakarta.validation.Valid;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/auth")
@Tag(name = "LoginController", description = "Api's for the authenticaion")
public class LoginController {

	@Autowired
	private UserService userService;
	@Autowired
	private BookDetailService bookDetailService;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private JwtUtils jwtUtils;

	@GetMapping("/landing")
	public ResponseEntity<BookResponse> viewLandingPage() {
		BookResponse bookResponse = bookDetailService.viewUserHome();
		return ResponseEntity.status(HttpStatus.OK).body(bookResponse);
	}

	@PostMapping("/register")
	@Operation(summary = "create new user !!")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "Success | OK"),
			@ApiResponse(responseCode = "401", description = "not authorized !!"),
			@ApiResponse(responseCode = "201", description = "new user created !!") })
	public ResponseEntity<?> addUser(@Valid @RequestBody UserResponse userDto) {
		try {
			userService.saveUser(userDto);
			return ResponseEntity.status(HttpStatus.OK).body("user saved successfull");
		} catch (UserAlreadyExistsException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
		}
	}

//	@PostMapping("/register")
//	public ResponseEntity<?> addUser(@Valid @RequestBody UserResponse userDto) {
//		try {
//			userService.saveUser(userDto);
//			return ResponseEntity.status(HttpStatus.OK).body("user saved successfull");
//		} catch (UserAlreadyExistsException e) {
//			return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
//		}
//	}

	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody AuthRequest request) {
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtTokenForUser(authentication);
		CustomUserDetail userDetail = (CustomUserDetail) authentication.getPrincipal();
		List<String> roles = userDetail.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
		return ResponseEntity.ok(new JwtResponse(userDetail.getId(), userDetail.getEmail(), jwt, roles));
	}

//	BOOK IMAGE
	@GetMapping("/getBookImg/{imageName}")
	public ResponseEntity<byte[]> getBookImg(@PathVariable String imageName) throws IOException {
		ResponseEntity<byte[]> bookImg = bookDetailService.getBookImage(imageName);
		return bookImg;
	}

	@GetMapping("/getUserProfile/{profilePic}")
	public ResponseEntity<byte[]> getUserProfile(@PathVariable String profilePic) {
		ResponseEntity<byte[]> userImg = null;
		try {
			userImg = userService.getUserProfile(profilePic);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return userImg;
	}

}
