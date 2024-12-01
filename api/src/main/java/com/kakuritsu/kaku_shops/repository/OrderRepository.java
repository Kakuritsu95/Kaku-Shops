package com.kakuritsu.kaku_shops.repository;

import com.kakuritsu.kaku_shops.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order,Long> {
    List<Order> findByUserId(Long userId);

    Optional<Order> findByRefCode(String refCode);
    @Query(value = """           
            SELECT EXISTS
            (
            SELECT 1
            FROM `order` o
            JOIN order_item oi ON oi.order_id = o.id
            WHERE o.user_id = :userId
            AND o.order_status = 'DELIVERED'
            AND oi.product_id = :productId
            )
            """,
            nativeQuery = true)
Long userHasPurchasedAndReceivedTheProduct(@Param("userId") Long userId, @Param("productId") Long productId);

}

