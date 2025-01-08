package com.kakuritsu.kaku_shops.service.cart;

import com.kakuritsu.kaku_shops.dto.CartDto;
import com.kakuritsu.kaku_shops.model.Cart;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.math.BigDecimal;
import java.util.Optional;

public interface ICartService {
    Cart getCartById(Long id);

    Optional<Cart> getCartBySessionId(String cartSessionId);
    void checkIfUserHasCartCookie(HttpServletRequest request);
    String generateCartCookieOrGetIfExists(HttpServletRequest request, HttpServletResponse response);
    void clearCart(Long id);

    BigDecimal getTotalPrice(Long id);

    Cart initializeNewCart(String sessionId);

    Cart getCartByUserId(Long userId);

    CartDto convertToDto(Cart cart);


}
