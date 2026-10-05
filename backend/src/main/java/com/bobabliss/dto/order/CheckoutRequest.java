package com.bobabliss.dto.order;

import lombok.Data;

@Data
public class CheckoutRequest {

      private String phone;
      private String deliveryAddress;
      private String paymentMethod;
      private String couponCode;

}
