package com.kakuritsu.kaku_shops.service.order;

import com.kakuritsu.kaku_shops.dto.OrderDto;
import com.kakuritsu.kaku_shops.model.Order;
import com.kakuritsu.kaku_shops.request.OrderRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface IOrderService {
    Order placeOrder(OrderRequest orderRequest,HttpServletRequest request, HttpServletResponse response);
    OrderDto getOrderById(Long orderId);
    Page<OrderDto> getByUserId(Long userId, int page);
    OrderDto getOrderByRefCode(String refCode);
    OrderDto convertToDto(Order order);
}



