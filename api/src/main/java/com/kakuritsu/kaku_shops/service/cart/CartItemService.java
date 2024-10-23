package com.kakuritsu.kaku_shops.service.cart;

import com.kakuritsu.kaku_shops.exceptions.CartOperationException;
import com.kakuritsu.kaku_shops.model.Cart;
import com.kakuritsu.kaku_shops.model.CartItem;
import com.kakuritsu.kaku_shops.model.Product;
import com.kakuritsu.kaku_shops.repository.CartItemRepository;
import com.kakuritsu.kaku_shops.repository.CartRepository;
import com.kakuritsu.kaku_shops.service.product.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartItemService implements ICartItemService {
    private final CartItemRepository cartItemRepository;
    private final IProductService productService;
    private final CartRepository cartRepository;
    private final ICartService cartService;

    @Override
    public Cart addItemToCart(Long cartId, Long productId, int quantity) {
        Cart cart = cartService.getCartById(cartId);
        Product product = productService.getProductById(productId);
        CartItem cartItem = cart.getCartItems().stream().filter(item -> item.getProduct().getId().equals(productId)).findFirst().orElse(new CartItem());
        if(cartItem.getId()==null){
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cartItem.setUnitPrice(product.getPrice());
            cart.addItem(cartItem);
        }
        else {
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        }
        cartItem.updateTotalPrice();

        cartItemRepository.save(cartItem);
        cart.updateTotalAmount();
        cartRepository.save(cart);

        return cart;
    }
    @Override
    public void removeItemFromCart(Long cartId, Long productId) {
        Cart cart = cartService.getCartById(cartId);
        CartItem cartToToRemove = this.getCartItem(cart,productId);
        cart.removeItem(cartToToRemove);
        cartRepository.save(cart);
    }

    @Override
    public void updateItemQuantity(Long cartId, Long productId, int quantity) {
        Cart cart = cartService.getCartById(cartId);
        CartItem cartItem = this.getCartItem(cart,productId);
        cartItem.setQuantity(quantity);
        cartItemRepository.save(cartItem);
        cartRepository.save(cart);
    }
    @Override
    public CartItem getCartItem(Cart cart, Long productId){

        return cart.getCartItems()
                .stream()
                .filter(item -> item
                        .getProduct()
                        .getId()
                        .equals(productId))
                .findFirst().orElseThrow(()-> new CartOperationException("Could not find item"));
    }
}