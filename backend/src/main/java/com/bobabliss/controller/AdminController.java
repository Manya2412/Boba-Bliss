package com.bobabliss.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.*;

import com.bobabliss.dto.product.ProductRequest;
import com.bobabliss.entity.Order;
import com.bobabliss.entity.Product;
import com.bobabliss.repository.OrderRepository;
import com.bobabliss.service.OrderService;
import com.bobabliss.service.ProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

      private final ProductService productService;
      private final OrderRepository orderRepository;
      private final OrderService orderService;

      @GetMapping("/orders")
      public List<Order> getAllOrder() {
            return orderRepository.findAll();
      }

      @PostMapping("/products")
      public Product addProduct(@RequestBody ProductRequest request) {
            return productService.addProduct(request);
      }

      @PutMapping("/products/{id}")
      public Product updateProduct(@PathVariable Long id, @RequestBody ProductRequest request) {
            return productService.updateProduct(id, request);
      }

      @PutMapping("/orders/{id}/status")
      public Order updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
            return orderService.updateStatus(id, body.get("status"));
      }

      @DeleteMapping("/products/{id}")
      public String deleteProduct(@PathVariable Long id) {
            productService.deleteProduct(id);
            return "Product deleted successfully!";
      }
}
