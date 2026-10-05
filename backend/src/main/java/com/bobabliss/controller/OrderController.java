package com.bobabliss.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.bobabliss.dto.order.CheckoutRequest;
import com.bobabliss.entity.Order;
import com.bobabliss.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

      private final OrderService orderService;

      @PostMapping
      public Order placOrder(@RequestBody CheckoutRequest request) {
            return orderService.placeOrder(request);
      }

      @GetMapping
      public List<Order> getMyOrders() {
            return orderService.getMyOrders();
      }

      @GetMapping("/{id}")
      public Order getOrder(@PathVariable Long id) {
            return orderService.getOrder(id);
      }

      @PutMapping("/{id}/cancel")
      public Order cancelOrder(@PathVariable Long id) {
            return orderService.cancelOrder(id);
      }
}
