package com.kakuritsu.kaku_shops.service.order;

import com.kakuritsu.kaku_shops.exceptions.ResourceNotFoundException;
import com.kakuritsu.kaku_shops.model.Order;
import com.kakuritsu.kaku_shops.model.OrderItem;
import com.kakuritsu.kaku_shops.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService implements IOrderService {
    private final OrderRepository orderRepository;
    @Override
    public Order placeOrder(Long userId) {
        return null;
    }


    private BigDecimal calculateTotalAmount(List<OrderItem> orderItems) {
       return orderItems.stream().reduce(BigDecimal.ZERO
               ,(acc,curr)-> acc.add(curr.getPrice().multiply(new BigDecimal(curr.getQuantity())))
               ,BigDecimal::add);
    }


    @Override
    public Order getOrder(Long orderId) {
        return orderRepository.findById(orderId).orElseThrow(()->new ResourceNotFoundException("Order not found"));
    }
}
