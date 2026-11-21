package com.bobabliss.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
            return orderRepository.findAllByOrderByOrderDateDesc();
      }

      @PostMapping(value = "/products", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
      public Product addProduct(
                  @RequestParam String name,
                  @RequestParam String category,
                  @RequestParam Double price,
                  @RequestParam("image") MultipartFile image) throws IOException {
            return productService.addProduct(name, category, price, image);
      }

      @PutMapping(value = "/products/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
      public Product updateProduct(
                  @PathVariable Long id,
                  @RequestParam String name,
                  @RequestParam String category,
                  @RequestParam Double price,
                  @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {
            return productService.updateProduct(id, name, category, price, image);
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