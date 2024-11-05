package com.kakuritsu.kaku_shops.exceptions;

public class UnauthorizedActionException extends RuntimeException {
   public UnauthorizedActionException(String message){
        super(message);
    }
}
