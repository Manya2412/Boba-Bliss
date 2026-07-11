package com.bobabliss.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {

  @NotBlank(message = "Full Name is required")
  @Size(min = 3, message = "Name must be at least 3 characters")
  private String fullName;

  @NotBlank(message = "Email is required")
  @Email(message = "Enter a valid email")
  private String email;

  @NotBlank(message = "Password is required")
  private String password;

  private String phone;

  private String address;
}
