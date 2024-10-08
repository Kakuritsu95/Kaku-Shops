package com.kakuritsu.kaku_shops.service.cart;

import com.kakuritsu.kaku_shops.model.Cart;
import com.kakuritsu.kaku_shops.model.CartItem;

public interface ICartItemService {
    Cart addItemToCart(Long cartId, Long productId, int quantity);
    void removeItemFromCart(Long cartId, Long productId);
    void updateItemQuantity(Long cartId,Long productId, int quantity);
    CartItem getCartItem(Cart cart, Long productId);

}
