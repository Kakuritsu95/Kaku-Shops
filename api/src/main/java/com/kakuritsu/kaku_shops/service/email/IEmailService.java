package com.kakuritsu.kaku_shops.service.email;

import com.kakuritsu.kaku_shops.model.Order;
import com.kakuritsu.kaku_shops.model.User;

public interface IEmailService {
   void sendOrderConfirmationEmail(Order order);

   void sendAccountVerificationEmail(User user, String verificationToken);
}
