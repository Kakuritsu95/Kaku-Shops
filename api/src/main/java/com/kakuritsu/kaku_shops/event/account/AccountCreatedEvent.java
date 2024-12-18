package com.kakuritsu.kaku_shops.event.account;


import com.kakuritsu.kaku_shops.model.User;
import org.springframework.context.ApplicationEvent;

public class AccountCreatedEvent extends ApplicationEvent {
    User newUser;
    public AccountCreatedEvent(Object source, User newUser) {
        super(source);
        this.newUser=newUser;
    }
   public User getUser(){
        return newUser;
    }
}
