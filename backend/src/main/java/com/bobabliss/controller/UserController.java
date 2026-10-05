package com.bobabliss.controller;

import org.springframework.web.bind.annotation.*;

import com.bobabliss.entity.User;
import com.bobabliss.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

      private final UserService userService;

      @GetMapping("/profile")
      public User getProfile() {
            return userService.getProfile();
      }

      @PutMapping("/profile")
      public User updateProfile(@RequestBody User user) {
            return userService.updateProfile(user);
      }
}
