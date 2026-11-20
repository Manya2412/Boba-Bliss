package com.bobabliss.service;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

      public Product addProduct(String name, String category, Double price, MultipartFile image)
                  throws IOException {

            Product product = Product.builder()
                        .name(name)
                        .category(category)
                        .price(price)
                        .image(image.getBytes())
                        .build();

            return productRepository.save(product);
      }

      public Product updateProduct(Long id, String name, String category, Double price, MultipartFile image)
                  throws IOException {

            Product product = getProductById(id);

            product.setName(name);
            product.setCategory(category);
            product.setPrice(price);

            // No new file means the current image stays.
            if (image != null && !image.isEmpty()) {
                  product.setImage(image.getBytes());
            }

            return productRepository.save(product);
      }

      public void deleteProduct(Long id) {

            Product product = getProductById(id);

            productRepository.delete(product);
      }
}