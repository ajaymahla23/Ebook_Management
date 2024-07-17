package com.ebook.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ebook.entity.Role;
import com.ebook.exception.RoleAlreadyExistException;
import com.ebook.service.RoleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/roles")
public class RoleController {
	@Autowired
	private RoleService roleService;

	@PostMapping("/create-new-role")
//	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<String> createRole(@RequestBody Role role) {
		try {
			roleService.creteRole(role);
			return ResponseEntity.ok("New role created successfully");
		} catch (RoleAlreadyExistException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
		}
	}

}
