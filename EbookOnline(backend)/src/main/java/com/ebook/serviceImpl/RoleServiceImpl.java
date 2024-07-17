package com.ebook.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ebook.entity.Role;
import com.ebook.exception.RoleAlreadyExistException;
import com.ebook.repo.RoleRepo;
import com.ebook.service.RoleService;

@Service
public class RoleServiceImpl implements RoleService {
	@Autowired
	private RoleRepo roleRepo;

	@Override
	public Role creteRole(Role thRole) {
		String roleName = "ROLE_" + thRole.getName().toUpperCase();
		Role role = new Role(roleName);
		if (roleRepo.existsByName(roleName)) {
			throw new RoleAlreadyExistException(thRole.getName() + "role already exists");
		}
		return roleRepo.save(role);
	}

}
