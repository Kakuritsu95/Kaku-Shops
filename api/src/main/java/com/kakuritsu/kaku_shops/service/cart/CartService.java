package com.kakuritsu.kaku_shops.service.cart;

import com.kakuritsu.kaku_shops.dto.CartDto;
import com.kakuritsu.kaku_shops.exceptions.CartOperationException;
import com.kakuritsu.kaku_shops.exceptions.ResourceNotFoundException;
import com.kakuritsu.kaku_shops.model.Cart;
import com.kakuritsu.kaku_shops.repository.CartItemRepository;
import com.kakuritsu.kaku_shops.repository.CartRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@EnableScheduling
public class CartService implements ICartService{
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ModelMapper mapper;

    @Override
    public Cart getCartById(Long id) {
        Cart cart =  cartRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Cart was not found"));
        BigDecimal totalAmount  = cart.getTotalAmount();
        cart.setTotalAmount(totalAmount);
        return cartRepository.save(cart);
    }
    @Override
    public Optional<Cart> getCartBySessionId(String cartSessionId){
      return cartRepository.findBySessionId(cartSessionId);
    }

    @Override
    @Transactional
       public void clearCart(Long cartId) {
        Cart cart = getCartById(cartId);
        cartItemRepository.deleteAllByCartId(cartId);
        cart.getCartItems().clear();
        cart.setTotalAmount(BigDecimal.ZERO);
    }

    @Override
    public BigDecimal getTotalPrice(Long id) {
      Cart cart = getCartById(id);
      return cart.getTotalAmount();
    }
    @Override
    public Cart initializeNewCart(String sessionId){
        Cart newCart = new Cart();
        newCart.setSessionId(sessionId);
        return cartRepository.save(newCart);
    }
    @Override
    public Cart getCartByUserId(Long userId) {
        return cartRepository.findByUserId(userId).orElseThrow(()-> new ResourceNotFoundException("Cart not found"));
    }
    @Override
    public CartDto convertToDto(Cart cart){
       return mapper.map(cart, CartDto.class);
    }
    @Override
    public void checkIfUserHasCartCookie(HttpServletRequest request){
        Cookie[] cookies = request.getCookies();
        if (cookies == null || Arrays.stream(cookies).noneMatch(cookie -> "cart".equals(cookie.getName()))) {
            throw new CartOperationException("Cart cookie not found");
        }
    }
    public String generateCartCookieOrGetIfExists(HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();

        return Arrays.stream(Optional.ofNullable(cookies).orElse(new Cookie[0]))
                .filter(cookie -> "cart".equals(cookie.getName()))
                .findFirst()
                .map(Cookie::getValue)
                .orElseGet(() -> {
                    String cartSessionId = UUID.randomUUID().toString();
                    Cookie newCookie = new Cookie("cart", cartSessionId);
                    newCookie.setHttpOnly(true);
                    newCookie.setMaxAge(7 * 24 * 60 * 60);
                    response.addCookie(newCookie);
                    return cartSessionId;
                });
    }

    @Scheduled(cron = "0 0 0 * * ?")
    @Transactional
    public void removeOrphanCarts(){
        cartRepository.deleteIfUserIdIsNull();
    }
}
