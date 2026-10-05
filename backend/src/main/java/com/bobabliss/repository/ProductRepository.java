package com.bobabliss.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bobabliss.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

      List<Product> findByAvailableTrue();

      List<Product> findByCategory(String category);

}
