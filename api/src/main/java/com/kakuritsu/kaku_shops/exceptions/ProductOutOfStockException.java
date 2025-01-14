package com.kakuritsu.kaku_shops.exceptions;

public class ProductOutOfStockException extends RuntimeException {
    public ProductOutOfStockException(String message){
        super(message);
    }
}
