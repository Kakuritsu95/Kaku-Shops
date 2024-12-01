package com.kakuritsu.kaku_shops.service.email;

import com.kakuritsu.kaku_shops.model.Order;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
@RequiredArgsConstructor
public class EmailService implements IEmailService {
    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;
    @Value("${app.mail.address}")
    private String applicationEmailAddress;


    @Override
    @Async
    public void sendOrderConfirmationEmail(Order order) {
        try {
            ClassPathResource logoImagePath = new ClassPathResource("static/image/logo.png");
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message,true, "UTF-8");
            helper.setFrom(applicationEmailAddress);
            helper.setTo(order.getEmail());
            helper.setSubject("Order confirmation - Kakushops.com");
            Context context = new Context();
            context.setVariable("order", order);
            String process = templateEngine.process("order-confirmation.html",context);
            helper.setText(process,true);
            helper.addInline("logoImage",logoImagePath);
            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

}
