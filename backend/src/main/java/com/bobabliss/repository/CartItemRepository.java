package com.bobabliss.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.bobabliss.entity.CartItem;
import com.bobabliss.entity.User;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

      @EntityGraph(attributePaths = "product")
      List<CartItem> findByUser(User user);

      Optional<CartItem> findByUserAndProductId(User user, Long productId);

      void deleteByUser(User user);

}
