package com.kakuritsu.kaku_shops.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;
@Data
public class CartDto {
    private Long id;
    private BigDecimal totalAmount;
    private List<CartItemDto> cartItems;
}
