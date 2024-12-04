package com.kakuritsu.kaku_shops.event.order;

import com.kakuritsu.kaku_shops.service.email.IEmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationListener;

import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserPlacedOrderListener implements ApplicationListener<UserPlacedOrderEvent> {
    private final IEmailService emailService;
    @Override
    public void onApplicationEvent(UserPlacedOrderEvent event) {
        emailService.sendOrderConfirmationEmail(event.getOrder());
    }
}
