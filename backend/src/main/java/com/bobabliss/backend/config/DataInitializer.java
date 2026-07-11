package com.bobabliss.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.webmvc.autoconfigure.WebMvcProperties.Apiversion.Use;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.bobabliss.backend.entity.Role;
import com.bobabliss.backend.entity.User;
import com.bobabliss.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  @Override
  public void run(String... args) throws Exception {
    if (!userRepository.existsByEmail("admin@bobabliss.com")) {
      User admin = User.builder()
          .fullName("Boba Admin")
          .email("admin@bobabliss.com")
          .password(passwordEncoder.encode("Admin@123"))
          .role(Role.ROLE_ADMIN)
          .verified(true)
          .enabled(true)
          .build();

      userRepository.save(admin);
    }
  }

}
