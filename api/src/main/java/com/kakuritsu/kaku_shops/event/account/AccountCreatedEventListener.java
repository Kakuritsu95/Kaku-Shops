package com.kakuritsu.kaku_shops.event.account;
import com.kakuritsu.kaku_shops.security.jwt.JwtUtils;
import com.kakuritsu.kaku_shops.service.email.IEmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationListener;

import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AccountCreatedEventListener implements ApplicationListener<AccountCreatedEvent> {
    private final IEmailService emailService;
    private final JwtUtils jwtUtils;
    @Override
    public void onApplicationEvent(AccountCreatedEvent event) {
        String verificationToken = jwtUtils.generateAccountActivationToken(event.getNewUser().getEmail());
        emailService.sendAccountVerificationEmail(event.getNewUser(),event.getServerDomain(), verificationToken);
    }
}
