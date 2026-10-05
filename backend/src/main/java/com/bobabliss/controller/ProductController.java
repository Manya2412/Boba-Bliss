package com.bobabliss.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.bobabliss.entity.Product;
import com.bobabliss.service.ProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

      private final ProductService productService;

      @GetMapping
      public List<Product> getAllProducts() {
            return productService.getAllProducts();
      }

      @GetMapping("/{id}")
      public Product getProductById(@PathVariable Long id) {
            return productService.getProductById(id);
      }
}
