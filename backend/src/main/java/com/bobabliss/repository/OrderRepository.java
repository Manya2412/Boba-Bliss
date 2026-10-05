package com.bobabliss.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.bobabliss.entity.Order;
import com.bobabliss.entity.User;

public interface OrderRepository extends JpaRepository<Order, Long> {

      @EntityGraph(attributePaths = "items")
      List<Order> findByUserOrderByOrderDateDesc(User user);

      @Override
      @EntityGraph(attributePaths = "items")
      Optional<Order> findById(Long id);

}
