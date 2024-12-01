package com.kakuritsu.kaku_shops.service.email;

import com.kakuritsu.kaku_shops.model.Order;

public interface IEmailService {
   void sendOrderConfirmationEmail(Order order);
}
