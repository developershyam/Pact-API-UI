package com.sample.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sample.model.User;
import com.sample.service.UserService;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping("/api/register")
	public String register(@RequestBody User user) {
		userService.saveUser(user);
		return "Hi " + user.getName() + " your Registration process successfully completed";
	}

	@GetMapping("/api/getAllUsers")
	public List<User> findAllUsers() {
		return userService.getAllUsers();
	}

	@GetMapping("/api/findUser/{email}")
	public List<User> findUser(@PathVariable String email) {
		return userService.getUserByEmail(email);
	}

	@DeleteMapping("/api/delete/{id}")
	public List<User> cancelRegistration(@PathVariable int id) {
		userService.deleteUserById(id);
		return userService.getAllUsers();
	}

}
