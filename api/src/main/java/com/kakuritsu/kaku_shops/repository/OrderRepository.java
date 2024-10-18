package com.kakuritsu.kaku_shops.repository;

import com.kakuritsu.kaku_shops.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Long> {
    List<Order> findByUserId(Long userId);
}