package com.kakuritsu.kaku_shops.request;

import lombok.Data;

@Data
public class FilterSortProductRequest {
    private String brand;
    private String sortBy;
    private Integer minPrice;
    private Integer maxPrice;
    private boolean popular;
    private boolean inStock;
    private boolean newArrivals;
    private int page = 1;
    private int size = 9;
}
