package com.bobabliss.service;

import org.springframework.stereotype.Service;

import com.bobabliss.entity.User;
import com.bobabliss.exception.ResourceNotFoundException;
import com.bobabliss.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

      private final UserRepository userRepository;

      public User getProfile(){

            return userRepository.findById(1L)
                        .orElseThrow(() -> 
                              new ResourceNotFoundException("User not found"));
      }

      public User updateProfile(User updatedUser){

            User user = getProfile();

            user.setFullName(updatedUser.getFullName());
            user.setPhone(updatedUser.getPhone());
            user.setAddress(updatedUser.getAddress());

            return userRepository.save(user);
      }
}
