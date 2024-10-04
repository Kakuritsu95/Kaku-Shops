package com.kakuritsu.kaku_shops.request;

import com.kakuritsu.kaku_shops.model.Category;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class AddProductRequest {
    @NotEmpty
    private String name;
    @NotNull
    @NotEmpty
    private String brand;
    @NotNull
    private BigDecimal price;
    @NotNull
    private Integer inventory;
    @NotNull
    @NotEmpty
    private String description;
    @NotNull
    private Category category;
}
