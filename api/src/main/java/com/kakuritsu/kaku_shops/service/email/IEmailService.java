package com.kakuritsu.kaku_shops.service.email;

import com.kakuritsu.kaku_shops.model.Order;
import com.kakuritsu.kaku_shops.model.User;
import com.kakuritsu.kaku_shops.request.GuestContactUsRequest;

public interface IEmailService {
   void sendOrderConfirmationEmail(Order order);

   void sendAccountVerificationEmail(User user, String verificationToken);

   void sendGuestContactUsMessage(GuestContactUsRequest request);
}
