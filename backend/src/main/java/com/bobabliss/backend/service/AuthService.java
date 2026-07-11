package com.bobabliss.backend.service;

import java.util.List;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bobabliss.backend.dto.request.LoginRequest;
import com.bobabliss.backend.dto.request.RegisterRequest;
import com.bobabliss.backend.dto.response.AuthResponse;
import com.bobabliss.backend.entity.Role;
import com.bobabliss.backend.entity.User;
import com.bobabliss.backend.repository.UserRepository;
import com.bobabliss.backend.security.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;

  public AuthResponse register(RegisterRequest request) {
    if (userRepository.existsByEmail(request.getEmail())) {
      throw new RuntimeException("Email already registered");
    }

    User user = User.builder()
        .fullName(request.getFullName())
        .email(request.getEmail())
        .password(passwordEncoder.encode(request.getPassword()))
        .phone(request.getPhone())
        .address(request.getAddress())
        .role(Role.ROLE_USER)
        .verified(false)
        .enabled(true)
        .build();

    userRepository.save(user);

    UserDetails userDetails = new org.springframework.security.core.userdetails.User(
        user.getEmail(),
        user.getPassword(),
        List.of(new SimpleGrantedAuthority(user.getRole().name())));

    String token = jwtService.generateToken(userDetails);

    return AuthResponse.builder()
        .token(token)
        .email(user.getEmail())
        .fullName(user.getFullName())
        .role(user.getRole().name())
        .build();
  }

  public AuthResponse login(LoginRequest request) {
    authenticationManager
        .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

    User user = userRepository.findByEmail(request.getEmail())
        .orElseThrow(() -> new RuntimeException("userdnot found"));

    UserDetails userDetails = new org.springframework.security.core.userdetails.User(
        user.getEmail(),
        user.getPassword(),
        List.of(new SimpleGrantedAuthority(user.getRole().name())));

    String token = jwtService.generateToken(userDetails);

    return AuthResponse.builder()
        .token(token)
        .email(user.getEmail())
        .fullName(user.getFullName())
        .role(user.getRole().name())
        .build();
  }

}
