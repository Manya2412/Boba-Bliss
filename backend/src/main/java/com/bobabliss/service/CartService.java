package com.bobabliss.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bobabliss.dto.cart.AddToCartRequest;
import com.bobabliss.entity.CartItem;
import com.bobabliss.entity.Product;
import com.bobabliss.exception.ResourceNotFoundException;
import com.bobabliss.repository.CartItemRepository;
import com.bobabliss.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartService {
  
      private final CartItemRepository cartItemRepository;
      private final ProductRepository productRepository;

      public List<CartItem> getCartItems() {
            return cartItemRepository.findAll();
      }

      public CartItem addToCart(AddToCartRequest request){

            Product product = productRepository.findById(request.getProductId())
                                          .orElseThrow(() -> 
                                          new ResourceNotFoundException("Product not found"));

            CartItem cartItem = CartItem.builder()
                                    .product(product)
                                    .quantity(request.getQuantity())
                                    .build();

            return cartItemRepository.save(cartItem);
      }

      public CartItem updateQuantity(Long id, Integer quantity){

            CartItem cartItem = cartItemRepository.findById(id)
                                    .orElseThrow(() -> 
                                          new ResourceNotFoundException("Cart item not found"));

            cartItem.setQuantity(quantity);

            return cartItemRepository.save(cartItem);
      }

      public void removeItem(Long id) {

            CartItem cartItem = cartItemRepository.findById(id)
                                          .orElseThrow(() -> 
                                                new ResourceNotFoundException("Cart item not found"));

            cartItemRepository.delete(cartItem);
      }

      public void clearCart() {
            cartItemRepository.deleteAll();
      }
}
