package com.kakuritsu.kaku_shops.event;

import com.kakuritsu.kaku_shops.dto.OrderDto;
import com.kakuritsu.kaku_shops.model.Order;
import org.springframework.context.ApplicationEvent;

public class UserPlacedOrderEvent extends ApplicationEvent {
    Order order;
    public UserPlacedOrderEvent(Object source, Order order) {
        super(source);
      this.order=order;
    }

    Order order(){
        return order;
    }
}
