package com.kakuritsu.kaku_shops.request;

import lombok.Data;

@Data
public class SearchProductsRequest {
    private String keyword;
    private String category;
    private String brand;
    private String sortBy;
    private boolean inStock;
    private int page;
    private int size = 10;
}
