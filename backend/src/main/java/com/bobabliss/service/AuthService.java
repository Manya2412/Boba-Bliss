package com.bobabliss.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bobabliss.dto.auth.AuthResponse;
import com.bobabliss.dto.auth.LoginRequest;
import com.bobabliss.dto.auth.RegisterRequest;
import com.bobabliss.entity.User;
import com.bobabliss.enums.Role;
import com.bobabliss.repository.UserRepository;
import com.bobabliss.security.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

      private final UserRepository userRepository;
      private final PasswordEncoder passwordEncoder;
      private final JwtService jwtService;
      private final AuthenticationManager authenticationManager;

  public AuthResponse register(RegisterRequest request){

    if(userRepository.existsByEmail(request.getEmail())){
      throw new RuntimeException("Email already exists.");
    }

    User user = User.builder()
            .fullName(request.getFullName())
            .email(request.getEmail())
            .phone(request.getPhone())
            .password(passwordEncoder.encode(request.getPassword()))
            .address(request.getAddress())
            .role(Role.ROLE_USER)
            .build();

    userRepository.save(user);

    String token = jwtService.generateToken(
                        new org.springframework.security.core.userdetails.User(
                              user.getEmail(),
                              user.getPassword(),
                              java.util.List.of()
                        ));

    return AuthResponse.builder()
                        .token(token)
                        .id(user.getId())
                        .fullName(user.getFullName())
                        .email(user.getEmail())
                        .phone(user.getPhone())
                        .address(user.getAddress())
                        .role(user.getRole().name())
                        .build();
  }

  public AuthResponse login(LoginRequest request){

      authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

      User user = userRepository.findByEmail(request.getEmail()).orElseThrow();
      
      String token = jwtService.generateToken(
                  new org.springframework.security.core.userdetails.User(
                        user.getEmail(),
                        user.getPassword(),
                        java.util.List.of()
                  )
      );

      return AuthResponse.builder()
                        .token(token)
                        .id(user.getId())
                        .fullName(user.getFullName())
                        .email(user.getEmail())
                        .phone(user.getPhone())
                        .address(user.getAddress())
                        .role(user.getRole().name())
                        .build();
  }
}
