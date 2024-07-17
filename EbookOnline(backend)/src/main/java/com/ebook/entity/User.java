package com.ebook.entity;

import java.util.Collection;
import java.util.Date;
import java.util.HashSet;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class User {

	@Id
	private String userId;
	private Date date;
	private String name;
	@Column(unique = true, nullable = false)
	@Email(message = "Invalid email")
	private String email;
	private String password;
	private String phoneNo;
	private String profilePic;

	@ManyToMany(fetch = FetchType.EAGER, cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH })
	@JoinTable(name = "user_role",
			joinColumns = @JoinColumn(referencedColumnName = "userId", name = "user_id"), 
			inverseJoinColumns = @JoinColumn(referencedColumnName = "id", name = "role_id"))
	private Collection<Role> roles = new HashSet<>();

}
