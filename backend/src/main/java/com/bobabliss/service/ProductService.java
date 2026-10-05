package com.bobabliss.service;

import java.util.List;
import org.springframework.stereotype.Service;

import com.bobabliss.dto.product.ProductRequest;
import com.bobabliss.entity.Product;
import com.bobabliss.exception.ResourceNotFoundException;
import com.bobabliss.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {

      private final ProductRepository productRepository;

      public List<Product> getAllProducts() {
            return productRepository.findAll();
      }

      public Product getProductById(Long id) {

            return productRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
      }

      public Product addProduct(ProductRequest request) {

            Product product = Product.builder()
                        .name(request.getName())
                        .description(request.getDescription())
                        .category(request.getCategory())
                        .price(request.getPrice())
                        .imageUrl(request.getImageUrl())
                        .available(request.getAvailable())
                        .build();

            return productRepository.save(product);
      }

      public Product updateProduct(Long id, ProductRequest request) {

            Product product = getProductById(id);

            product.setName(request.getName());
            product.setDescription(request.getDescription());
            product.setCategory(request.getCategory());
            product.setPrice(request.getPrice());
            product.setImageUrl(request.getImageUrl());
            product.setAvailable(request.getAvailable());

            return productRepository.save(product);
      }

      public void deleteProduct(Long id) {

            Product product = getProductById(id);

            productRepository.delete(product);
      }
}
