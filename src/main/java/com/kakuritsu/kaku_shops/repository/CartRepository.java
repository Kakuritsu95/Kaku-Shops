package com.kakuritsu.kaku_shops.repository;

import com.kakuritsu.kaku_shops.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart,Long> {
}
