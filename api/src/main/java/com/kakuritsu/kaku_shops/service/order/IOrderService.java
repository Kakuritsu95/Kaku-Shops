package com.kakuritsu.kaku_shops.service.order;

import com.kakuritsu.kaku_shops.dto.OrderDto;
import com.kakuritsu.kaku_shops.model.Order;
import com.kakuritsu.kaku_shops.request.OrderRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.List;

public interface IOrderService {
    Order placeOrder(OrderRequest orderRequest,HttpServletRequest request, HttpServletResponse response);
    OrderDto getOrderById(Long orderId);
    List<OrderDto> getUserOrders(Long id);

    OrderDto convertToDto(Order order);
}



