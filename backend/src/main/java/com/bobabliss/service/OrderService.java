package com.bobabliss.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bobabliss.dto.order.CheckoutRequest;
import com.bobabliss.entity.Order;
import com.bobabliss.entity.OrderItem;
import com.bobabliss.entity.Product;
import com.bobabliss.entity.User;
import com.bobabliss.enums.OrderStatus;
import com.bobabliss.exception.ResourceNotFoundException;
import com.bobabliss.repository.OrderRepository;
import com.bobabliss.repository.ProductRepository;
import com.bobabliss.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {

      private static final double DELIVERY_FEE = 20.0;
      private static final String DISCOUNT_CODE = "BOBA20";

      private final OrderRepository orderRepository;
      private final ProductRepository productRepository;
      private final UserRepository userRepository;

      @Transactional
      public Order placeOrder(CheckoutRequest request) {

            User user = getCurrentUser();

            if (request.getItems() == null || request.getItems().isEmpty()) {
                  throw new RuntimeException("Your cart is empty");
            }
            if (isBlank(request.getPhone()) || isBlank(request.getDeliveryAddress())
                        || isBlank(request.getPaymentMethod())) {
                  throw new RuntimeException("Phone, delivery address and payment method are required");
            }

            List<Long> productIds = request.getItems().stream()
                        .map(CheckoutRequest.Item::getProductId)
                        .toList();

            Map<Long, Product> productsById = productRepository.findAllById(productIds).stream()
                        .collect(Collectors.toMap(Product::getId, Function.identity()));

            Order order = Order.builder()
                        .user(user)
                        .phone(request.getPhone().trim())
                        .deliveryAddress(request.getDeliveryAddress().trim())
                        .paymentMethod(request.getPaymentMethod())
                        .orderDate(LocalDateTime.now())
                        .orderStatus(OrderStatus.PLACED)
                        .build();

            double subtotal = 0.0;

            for (CheckoutRequest.Item item : request.getItems()) {

                  if (item.getProductId() == null || item.getQuantity() == null || item.getQuantity() < 1) {
                        throw new RuntimeException("Invalid item in your cart");
                  }

                  Product product = productsById.get(item.getProductId());

                  if (product == null) {
                        throw new ResourceNotFoundException("Product not found with id: " + item.getProductId());
                  }

                  double lineTotal = product.getPrice() * item.getQuantity();
                  subtotal += lineTotal;

                  order.addItem(OrderItem.builder()
                              .productid(product.getId())
                              .productName(product.getName())
                              .unitprice(product.getPrice())
                              .quantity(item.getQuantity())
                              .lineTital(lineTotal)
                              .build());
            }

            boolean couponApplied = request.getCouponCode() != null
                        && DISCOUNT_CODE.equalsIgnoreCase(request.getCouponCode().trim());

            double discountAmount = couponApplied ? subtotal * 0.20 : 0.0;

            order.setSubtotal(round(subtotal));
            order.setDiscountAmount(round(discountAmount));
            order.setDeliveryFree(DELIVERY_FEE);
            order.setTotalAmount(round(subtotal - discountAmount + DELIVERY_FEE));
            order.setCouponCode(couponApplied ? DISCOUNT_CODE : null);

            return orderRepository.save(order);
      }

      @Transactional(readOnly = true)
      public List<Order> getMyOrders() {

            User user = getCurrentUser();

            return orderRepository.findByUserOrderByOrderDateDesc(user);
      }

      @Transactional(readOnly = true)
      public Order getOrder(Long orderId) {

            User user = getCurrentUser();
            Order order = findOrder(orderId);
            verifyOrderOwner(order, user);

            return order;
      }

      @Transactional
      public Order cancelOrder(Long orderId) {

            User user = getCurrentUser();
            Order order = findOrder(orderId);
            verifyOrderOwner(order, user);

            if (order.getOrderStatus() == OrderStatus.DELIVERED) {
                  throw new RuntimeException("Delivered order cannot be cancelled");
            }

            if (order.getOrderStatus() == OrderStatus.CANCELLED) {
                  throw new RuntimeException("Order is already cancelled");
            }

            order.setOrderStatus(OrderStatus.CANCELLED);

            return orderRepository.save(order);
      }

      @Transactional
      public Order updateStatus(Long id, String status) {

            Order order = findOrder(id);

            if (status == null || status.isBlank()) {
                  throw new RuntimeException("Order status is required");
            }

            try {
                  order.setOrderStatus(OrderStatus.valueOf(status.trim().toUpperCase()));
            } catch (IllegalArgumentException e) {
                  throw new RuntimeException("Invalid order status: " + status);
            }

            return orderRepository.save(order);
      }

      private Order findOrder(Long orderId) {

            return orderRepository.findById(orderId)
                        .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));
      }

      private User getCurrentUser() {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication == null || !authentication.isAuthenticated()) {
                  throw new RuntimeException("User is not authenticated");
            }

            return userRepository.findByEmail(authentication.getName())
                        .orElseThrow(() -> new ResourceNotFoundException("User not found"));

      }

      private boolean isBlank(String value) {
            return value == null || value.isBlank();
      }

      private double round(double value) {
            return Math.round(value * 100.0) / 100.0;
      }

      private void verifyOrderOwner(Order order, User user) {

            if (!order.getUser().getId().equals(user.getId())) {
                  throw new RuntimeException("You cannot access this order");
            }
      }
}