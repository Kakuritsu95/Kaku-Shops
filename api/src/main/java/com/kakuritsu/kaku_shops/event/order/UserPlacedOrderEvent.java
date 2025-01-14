package com.kakuritsu.kaku_shops.event.order;

import com.kakuritsu.kaku_shops.model.Order;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class UserPlacedOrderEvent extends ApplicationEvent {
    Order order;
    String serverDomain;
    public  UserPlacedOrderEvent(Object source, Order order, String serverDomain) {
        super(source);
      this.order=order;
      this.serverDomain=serverDomain;
    }


}
