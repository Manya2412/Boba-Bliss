package com.bobabliss.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.bobabliss.entity.User;
import com.bobabliss.enums.Role;
import com.bobabliss.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AdminSeeder implements CommandLineRunner {

      private final UserRepository userRepository;
      private final PasswordEncoder passwordEncoder;

      @Override
      public void run(String... args) {

            if (!userRepository.existsByEmail("admin@bobabliss.com")) {
                  User admin = User.builder()
                              .fullName("Admin")
                              .email("admin@bobabliss.com")
                              .phone("9999999999")
                              .address("Bangalore")
                              .password(passwordEncoder.encode("admin123"))
                              .role(Role.ROLE_ADMIN)
                              .build();

                  userRepository.save(admin);
            }

      }
}
