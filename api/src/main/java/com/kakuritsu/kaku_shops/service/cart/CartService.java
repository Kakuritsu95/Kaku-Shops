package com.kakuritsu.kaku_shops.service.cart;

import com.kakuritsu.kaku_shops.dto.CartDto;
import com.kakuritsu.kaku_shops.exceptions.ResourceNotFoundException;
import com.kakuritsu.kaku_shops.model.Cart;
import com.kakuritsu.kaku_shops.model.User;
import com.kakuritsu.kaku_shops.repository.CartItemRepository;
import com.kakuritsu.kaku_shops.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
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
    public Cart initializeNewCart(User user){
        Cart newCart = new Cart();
        newCart.setUser(user);
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
}
