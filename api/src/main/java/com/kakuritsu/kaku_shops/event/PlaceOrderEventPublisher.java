package com.kakuritsu.kaku_shops.event;

import com.kakuritsu.kaku_shops.model.Order;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PlaceOrderEventPublisher {
private final ApplicationEventPublisher applicationEventPublisher;

    public void publishOrderEvent(final Order order){
        UserPlacedOrderEvent event = new UserPlacedOrderEvent(this,  order);
        applicationEventPublisher.publishEvent(event);
    }
}
