package com.ebook.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ebook.entity.User;
import com.ebook.repo.UserRepo;

@Service
public class CustomUserDetailService implements UserDetailsService {
	@Autowired
	private UserRepo userRepo;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = userRepo.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
//		CustomUserDetail customUserDetail = new CustomUserDetail(user);
		return CustomUserDetail.buildUserDetails(user);
	}

}
