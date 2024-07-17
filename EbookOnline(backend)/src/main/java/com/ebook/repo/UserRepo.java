package com.ebook.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ebook.entity.User;

public interface UserRepo extends JpaRepository<User, String> {

	boolean existsByUserId(String userId);

	public Optional<User> findByEmail(String username);

	boolean existsByEmail(String email);

}
