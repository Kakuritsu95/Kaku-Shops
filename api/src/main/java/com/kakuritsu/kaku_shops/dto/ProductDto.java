package com.kakuritsu.kaku_shops.dto;

import com.kakuritsu.kaku_shops.model.Category;
import com.kakuritsu.kaku_shops.model.Image;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductDto {
    private long id;
    private String name;
    private String brand;
    private BigDecimal price;
    private int inventory;
    private String description;
    private double averageRating;
    private int sellCount;
    private CategoryDto category;
    private List<ImageDto> images;
}
