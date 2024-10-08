package com.kakuritsu.kaku_shops.request;

import lombok.Data;

@Data
public class AddCartItemRequest {
    private int quantity;
    private Long productId;
    private Long cartId;
}
