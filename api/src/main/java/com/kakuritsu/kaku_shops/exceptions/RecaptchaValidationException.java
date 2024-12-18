package com.kakuritsu.kaku_shops.exceptions;

public class RecaptchaValidationException extends RuntimeException{
  public  RecaptchaValidationException(String message){
        super(message);
    }
}
