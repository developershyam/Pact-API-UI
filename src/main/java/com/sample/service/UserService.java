package com.sample.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sample.model.User;
import com.sample.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository repository;

	public void saveUser(User user) {
		repository.save(user);
		;
	}

	public List<User> getAllUsers() {
		return repository.findAll();
	}

	public List<User> getUserByEmail(String email) {
		return repository.findByEmail(email);
	}

	public void deleteUserById(int id) {
		repository.deleteById(id);
	}
}
