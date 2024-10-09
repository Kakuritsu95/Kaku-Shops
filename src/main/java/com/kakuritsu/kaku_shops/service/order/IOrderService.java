package com.kakuritsu.kaku_shops.service.order;

import com.kakuritsu.kaku_shops.model.Order;

public interface IOrderService {
    Order placeOrder(Long userId);
    Order getOrder(Long orderId);
}



