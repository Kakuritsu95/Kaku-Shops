package com.kakuritsu.kaku_shops.service.order;

import com.kakuritsu.kaku_shops.dto.OrderDto;
import com.kakuritsu.kaku_shops.model.Order;
import com.kakuritsu.kaku_shops.model.OrderItem;

import java.math.BigDecimal;
import java.util.List;

public interface IOrderService {
    Order placeOrder(Long userId);
    OrderDto getOrderById(Long orderId);
    List<OrderDto> getUserOrders(Long id);

    OrderDto convertToDto(Order order);
}



