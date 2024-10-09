package com.kakuritsu.kaku_shops.repository;

import com.kakuritsu.kaku_shops.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order,Long> {
}
