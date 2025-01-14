package com.kakuritsu.kaku_shops.event;

import com.kakuritsu.kaku_shops.event.account.AccountCreatedEvent;
import com.kakuritsu.kaku_shops.event.order.UserPlacedOrderEvent;
import com.kakuritsu.kaku_shops.model.Order;
import com.kakuritsu.kaku_shops.model.User;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EventPublisher {
private final ApplicationEventPublisher applicationEventPublisher;

    public void publishOrderEvent(final Order order,String serverDomain){
        UserPlacedOrderEvent event = new UserPlacedOrderEvent(this, order, serverDomain);
        applicationEventPublisher.publishEvent(event);
    }
    public void publishAccountCreatedEvent(final User user, String serverDomain){
        AccountCreatedEvent event = new AccountCreatedEvent(this, user,serverDomain);
        applicationEventPublisher.publishEvent(event);
    }
}
