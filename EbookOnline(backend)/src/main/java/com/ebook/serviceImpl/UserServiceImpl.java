package com.ebook.serviceImpl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ebook.entity.MyOrderBook;
import com.ebook.entity.Role;
import com.ebook.entity.User;
import com.ebook.exception.UserAlreadyExistsException;
import com.ebook.exception.UserNotFoundException;
import com.ebook.repo.BookOrderDetailRepo;
import com.ebook.repo.MyOrderBookRepo;
import com.ebook.repo.RoleRepo;
import com.ebook.repo.UserRepo;
import com.ebook.response.UserResponse;
import com.ebook.service.UserService;

import jakarta.servlet.http.HttpSession;

@Service
//@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	@Autowired
	private UserRepo userRepo;
	@Autowired
	private RoleRepo roleRepo;
	@Autowired
	private MyOrderBookRepo myOrderBookRepo;
	@Autowired
	BookOrderDetailRepo bookOrderDetailRepo;

	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Value("${ebook.book.images}")
	private String uploadBookImages;

//	private final UserRepo repoUserRepo;

	@Override
	public User saveUser(UserResponse userDto) {

		User user = modelMapper.map(userDto, User.class);
		if (userRepo.existsByEmail(user.getEmail())) {
			throw new UserAlreadyExistsException(user.getEmail() + "already exists");
		}

//		Role userRole = roleRepo.findByName("ROLE_USER").get();
		Role userRole = roleRepo.findByName("ROLE_ADMIN").get();
		user.setRoles(Collections.singletonList(userRole));
		user.setPassword(passwordEncoder.encode(userDto.getPassword()));
		String userId = UUID.randomUUID().toString();
		user.setUserId(userId);
		while (userRepo.existsByUserId(user.getUserId())) {
			userId = UUID.randomUUID().toString();
			user.setUserId(userId);
		}
		user.setDate(new Date());
		user.setProfilePic("https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106");
		User saveUser = userRepo.save(user);
		return saveUser;
	}

	@Override
	public ResponseEntity<byte[]> getUserProfile(String profilePic) throws IOException {
		uploadBookImages = uploadBookImages.trim().replaceAll("\\s", "");
		Path path = Paths.get(uploadBookImages, profilePic);
		byte[] imgBytes = Files.readAllBytes(path);
		return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imgBytes);
	}

//	@Override
//	public User updateUser(User currentUser, User updatedData, String providedPassword, MultipartFile profilePic,
//			HttpSession session) {
//		String message;
//		if (currentUser.getPassword().equals(providedPassword)) {
//			currentUser.setEmail(updatedData.getEmail());
//			currentUser.setName(updatedData.getName());
//			currentUser.setPhoneNo(updatedData.getPhoneNo());
//			message = "Your data is updated";
//
//		} else {
//			message = "Invalid Password!!!";
//			session.setAttribute("message", "Invalid Password!!!");
//		}
//
//		return userRepo.save(currentUser);
//	}
	@Override
	public User updateUser(User currentUser, User updatedData, String providedPassword, MultipartFile profilePic,
			HttpSession session) {
		if (currentUser.getPassword().equals(providedPassword)) {
			currentUser.setEmail(updatedData.getEmail());
			currentUser.setName(updatedData.getName());
			currentUser.setPhoneNo(updatedData.getPhoneNo());
			session.setAttribute("message", "User updated successfully!");
		} else {
			session.setAttribute("message", "Invalid Password!!!");
		}
		return userRepo.save(currentUser);
	}

	@Override
	public UserResponse getUserInfoAndOrders(Principal principal) {
		Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE, Sort.by("date").descending());
		User user = userRepo.findByEmail(principal.getName())
				.orElseThrow(() -> new UserNotFoundException("User not found"));
		List<MyOrderBook> myOrderBookList = myOrderBookRepo.findByUserId(user.getUserId(), pageable).getContent();
		UserResponse response = modelMapper.map(user, UserResponse.class);
		response.setMyOrderBookList(myOrderBookList);
		return response;
	}

}
