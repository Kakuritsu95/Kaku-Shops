package com.kakuritsu.kaku_shops.service.cart;

import com.kakuritsu.kaku_shops.exceptions.ResourceNotFoundException;
import com.kakuritsu.kaku_shops.model.Cart;
import com.kakuritsu.kaku_shops.model.CartItem;
import com.kakuritsu.kaku_shops.repository.CartItemRepository;
import com.kakuritsu.kaku_shops.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class CartService implements ICartService{
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    @Override
    public Cart getCartById(Long id) {
        Cart cart =  cartRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Cart was not found"));
        BigDecimal totalAmount  = cart.getTotalAmount();
        cart.setTotalAmount(totalAmount);
        return cartRepository.save(cart);
    }

    @Override
    public void clearCart(Long id) {

        Cart cart = getCartById(id);
        cartItemRepository.deleteAllByCartId(id);
        cart.getCartItems().clear();
        cartRepository.deleteById(id);

    }

    @Override
    public BigDecimal getTotalPrice(Long id) {
      Cart cart = getCartById(id);
      return cart.getTotalAmount();
    }
}
