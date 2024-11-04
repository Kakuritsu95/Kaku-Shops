package com.kakuritsu.kaku_shops.repository;

import com.kakuritsu.kaku_shops.model.ProductRating;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRatingRepository extends JpaRepository<ProductRating,Long> {
   Optional<ProductRating> findByProductIdAndUserId(Long productId, Long userId);
}
