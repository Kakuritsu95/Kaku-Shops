package com.kakuritsu.kaku_shops.repository;

import com.kakuritsu.kaku_shops.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart,Long> {
     Optional<Cart> findByUserId(Long userId);

     Optional<Cart> findBySessionId(String cartSessionId);

    @Modifying
    @Query("DELETE FROM Cart c WHERE c.user IS NULL")
     void deleteIfUserIdIsNull();
}
