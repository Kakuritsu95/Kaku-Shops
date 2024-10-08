package com.kakuritsu.kaku_shops.request;

import com.kakuritsu.kaku_shops.model.Category;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductUpdateRequest {
    private String name;
    private String brand;
    private BigDecimal price;
    private Integer inventory;
    private String description;
    private Category category;
}
