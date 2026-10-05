package com.bobabliss.dto.product;

import lombok.Data;

@Data
public class ProductRequest {

      private String name;
      private String description;
      private String category;
      private Double price;
      private String imageUrl;
      private Boolean available;

}
