package com.kakuritsu.kaku_shops.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class UpdateProductRequest {
    @Size(min = 1)
    private String name;
    @Size(min = 1)
    private String brand;
    @Min(1)
    private BigDecimal price;
    @Min(0)
    private Integer inventory;
    @Size(min = 1)
    private String description;
    @Size(min=1)
    private String category;
}
