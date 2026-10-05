package com.bobabliss.controller;

import org.springframework.web.bind.annotation.*;

import com.bobabliss.dto.auth.AuthResponse;
import com.bobabliss.dto.auth.LoginRequest;
import com.bobabliss.dto.auth.RegisterRequest;
import com.bobabliss.service.AuthService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

      private final AuthService authService;

      @PostMapping("/register")
      public AuthResponse register(@RequestBody RegisterRequest request) {
            return authService.register(request);
      }

      @PostMapping("/login")
      public AuthResponse login(@RequestBody LoginRequest request) {
            return authService.login(request);
      }
}
