package com.bobabliss.dto.order;

import java.util.List;

import lombok.Data;

@Data
public class CheckoutRequest {

      private List<Item> items;

      private String couponCode;
      private String phone;
      private String deliveryAddress;
      private String paymentMethod;

      @Data
      public static class Item {
            private Long productId;
            private Integer quantity;
      }
}