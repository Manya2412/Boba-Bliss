package com.bobabliss.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bobabliss.dto.order.CheckoutRequest;
import com.bobabliss.entity.CartItem;
import com.bobabliss.entity.Order;
import com.bobabliss.entity.OrderItem;
import com.bobabliss.entity.Product;
import com.bobabliss.entity.User;
import com.bobabliss.enums.OrderStatus;
import com.bobabliss.exception.ResourceNotFoundException;
import com.bobabliss.repository.CartItemRepository;
import com.bobabliss.repository.OrderRepository;
import com.bobabliss.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {

      private static final double DELIVERY_FEE = 40.0;
      private static final String DISCOUNT_CODE = "BOBA20";

      private final OrderRepository orderRepository;
      private final CartItemRepository cartItemRepository;
      private final UserRepository userRepository;

      @Transactional
      public Order placeOrder(CheckoutRequest request) {

            User user = getCurrentUser();

            List<CartItem> cartItems = cartItemRepository.findByUser(user);

            if (cartItems.isEmpty()) {
                  throw new RuntimeException("Your cart is empty");
            }

            double subtotal = cartItems.stream()
                        .mapToDouble(item -> item.getProduct().getPrice() * item.getQuantity()).sum();

            boolean couponApplied = request.getCouponCode() != null
                        && DISCOUNT_CODE.equalsIgnoreCase(request.getCouponCode().trim());

            double discountAmount = couponApplied ? subtotal * 0.20 : 0.0;

            double totalAmount = subtotal - discountAmount + DELIVERY_FEE;

            Order order = Order.builder()
                        .user(user)
                        .subtotal(subtotal)
                        .discountAmount(discountAmount)
                        .deliveryFree(DELIVERY_FEE)
                        .totalAmount(totalAmount)
                        .couponCode(couponApplied ? DISCOUNT_CODE : null)
                        .phone(request.getPhone())
                        .deliveryAddress(request.getDeliveryAddress())
                        .paymentMethod(request.getPaymentMethod())
                        .orderDate(LocalDateTime.now())
                        .orderStatus(OrderStatus.PLACED)
                        .build();

            for (CartItem cartItem : cartItems) {
                  Product product = cartItem.getProduct();

                  double lineTotal = product.getPrice() * cartItem.getQuantity();

                  OrderItem orderItem = OrderItem.builder()
                              .productid(product.getId())
                              .productName(product.getName())
                              .productImageUrl(product.getImageUrl())
                              .unitprice(product.getPrice())
                              .quantity(cartItem.getQuantity())
                              .lineTital(lineTotal)
                              .build();

                  order.addItem(orderItem);
            }

            Order savedOrder = orderRepository.save(order);

            cartItemRepository.deleteByUser(user);

            return savedOrder;
      }

      @Transactional(readOnly = true)
      public List<Order> getMyOrders() {

            User user = getCurrentUser();

            return orderRepository.findByUserOrderByOrderDateDesc(user);
      }

      @Transactional(readOnly = true)
      public Order getOrder(Long orderId) {

            User user = getCurrentUser();

            Order order = orderRepository.findById(orderId)
                        .orElseThrow(() -> new ResourceNotFoundException("Order not found wit id: " + orderId));

            verifyOrderOwner(order, user);

            return order;
      }

      @Transactional(readOnly = true)
      public Order cancelOrder(Long orderId) {

            User user = getCurrentUser();

            Order order = orderRepository.findById(orderId)
                        .orElseThrow(() -> new ResourceNotFoundException("Order not found wit id: " + orderId));

            verifyOrderOwner(order, user);

            if (order.getOrderStatus() == OrderStatus.DELIVERED) {
                  throw new RuntimeException("Delivered order cannot be cancelled");
            }

            order.setOrderStatus(OrderStatus.CANCELLED);

            return orderRepository.save(order);
      }

      private User getCurrentUser() {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication == null || !authentication.isAuthenticated()) {
                  throw new RuntimeException("User is not authenticated");
            }

            return userRepository.findByEmail(authentication.getName())
                        .orElseThrow(() -> new ResourceNotFoundException("User not found"));

      }

      public Order updateStatus(Long id, String status) {

            Order order = getOrder(id);

            order.setOrderStatus(OrderStatus.valueOf(status));

            return orderRepository.save(order);
      }

      private void verifyOrderOwner(Order order, User user) {

            if (!order.getUser().getId().equals(user.getId())) {
                  throw new RuntimeException("You cannot access this order");
            }
      }
}
