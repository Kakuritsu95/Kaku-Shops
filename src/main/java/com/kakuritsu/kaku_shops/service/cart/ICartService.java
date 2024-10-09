package com.kakuritsu.kaku_shops.service.cart;

import com.kakuritsu.kaku_shops.model.Cart;

import java.math.BigDecimal;

public interface ICartService {
    Cart getCartById(Long id);
    void clearCart(Long id);

    BigDecimal getTotalPrice(Long id);

    Long initializeNewCart();
}
