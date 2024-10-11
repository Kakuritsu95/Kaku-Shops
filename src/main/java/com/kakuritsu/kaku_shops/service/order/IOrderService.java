package com.kakuritsu.kaku_shops.service.order;

import com.kakuritsu.kaku_shops.model.Order;
import com.kakuritsu.kaku_shops.model.OrderItem;

import java.math.BigDecimal;
import java.util.List;

public interface IOrderService {
    Order placeOrder(Long userId);

    Order getOrder(Long orderId);
}



