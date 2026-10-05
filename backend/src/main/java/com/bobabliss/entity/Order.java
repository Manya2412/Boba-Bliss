package com.bobabliss.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.bobabliss.enums.OrderStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "orders")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Order {

      @Id
      @GeneratedValue(strategy = GenerationType.IDENTITY)
      private Long id;

      @ManyToOne(fetch = FetchType.LAZY)
      @JoinColumn(name = "user_id", nullable = false)
      @JsonIgnore
      private User user;

      @Builder.Default
      @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
      private List<OrderItem> items = new ArrayList<>();

      @Column(nullable = false)
      private Double subtotal;

      @Column(nullable = false)
      private Double discountAmount;

      @Column(nullable = false)
      private Double deliveryFree;

      @Column(nullable = false)
      private Double totalAmount;

      private String couponCode;

      @Column(nullable = false)
      private String phone;

      @Column(nullable = false, length = 1000)
      private String deliveryAddress;

      @Column(nullable = false)
      private String paymentMethod;

      @Column(nullable = false)
      private LocalDateTime orderDate;

      @Enumerated(EnumType.STRING)
      @Column(nullable = false)
      private OrderStatus orderStatus;

      public void addItem(OrderItem item) {
            items.add(item);
            item.setOrder(this);
      }

}
