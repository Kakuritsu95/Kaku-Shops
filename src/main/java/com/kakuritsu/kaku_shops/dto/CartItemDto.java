package com.kakuritsu.kaku_shops.dto;

import com.kakuritsu.kaku_shops.model.Product;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CartItemDto {
    private Long id;
    private Integer quantity;
    private BigDecimal unitPrice;
    private ProductDto product;

}
