package com.kakuritsu.kaku_shops.event;

import com.kakuritsu.kaku_shops.event.account.AccountCreatedEvent;
import com.kakuritsu.kaku_shops.event.order.UserPlacedOrderEvent;
import com.kakuritsu.kaku_shops.model.Order;
import com.kakuritsu.kaku_shops.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EventPublisher {
private final ApplicationEventPublisher applicationEventPublisher;

    public void publishOrderEvent(final Order order){
        UserPlacedOrderEvent event = new UserPlacedOrderEvent(this,  order);
        applicationEventPublisher.publishEvent(event);
    }
    public void publishAccountCreatedEvent(final User user){
        AccountCreatedEvent event = new AccountCreatedEvent(this, user);
        applicationEventPublisher.publishEvent(event);
    }
}
