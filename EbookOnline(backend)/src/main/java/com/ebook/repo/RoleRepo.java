package com.ebook.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ebook.entity.Role;

public interface RoleRepo extends JpaRepository<Role, Long> {

	Optional<Role> findByName(String role);

	boolean existsByName(String roleName);

}
