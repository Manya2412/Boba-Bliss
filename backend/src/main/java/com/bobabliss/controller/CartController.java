package com.bobabliss.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.bobabliss.dto.cart.AddToCartRequest;
import com.bobabliss.dto.cart.UpdateCartRequest;
import com.bobabliss.entity.CartItem;
import com.bobabliss.service.CartService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

      private final CartService cartService;

      @GetMapping
      public List<CartItem> getCartItems() {
            return cartService.getCartItems();
      }

      @PostMapping("/items")
      public CartItem addToCart(@RequestBody AddToCartRequest request) {
            return cartService.addToCart(request);
      }

      @PutMapping("/items/{id}")
      public CartItem updateQunatity(@PathVariable Long id, @RequestBody UpdateCartRequest request) {
            return cartService.updateQuantity(id, request.getQuantity());
      }

      @DeleteMapping("/items/{id}")
      public String removeItem(@PathVariable Long id) {
            cartService.removeItem(id);

            return "Item removed";
      }

      @DeleteMapping
      public String clearCart() {
            cartService.clearCart();

            return "Cart cleared";
      }
}
