package com.bobabliss.exception;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

      @ExceptionHandler(ResourceNotFoundException.class)
      public ResponseEntity<?> handleRuntime(ResourceNotFoundException ex) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("message", ex.getMessage()));
      }

}
