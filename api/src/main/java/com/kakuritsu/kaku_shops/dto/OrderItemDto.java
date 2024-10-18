package com.kakuritsu.kaku_shops.dto;

import com.kakuritsu.kaku_shops.model.Product;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class OrderItemDto {
    private Long id;
    private int quantity;
    private BigDecimal price;
    private ProductDto product;
}
