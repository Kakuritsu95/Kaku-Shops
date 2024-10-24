package com.kakuritsu.kaku_shops.service.cart;

import com.kakuritsu.kaku_shops.model.Cart;
import com.kakuritsu.kaku_shops.model.CartItem;

public interface ICartItemService {
    Cart addItemToCart(String cartSessionId, Long productId, int quantity);
    void removeItemFromCart(String cartSessionId, Long productId);
    void updateItemQuantity(String cartSessionId,Long productId, int quantity);
    CartItem getCartItem(Cart cart, Long productId);

}
