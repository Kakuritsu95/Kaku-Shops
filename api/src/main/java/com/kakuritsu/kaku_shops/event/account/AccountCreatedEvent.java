package com.kakuritsu.kaku_shops.event.account;


import com.kakuritsu.kaku_shops.model.User;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter

public class AccountCreatedEvent extends ApplicationEvent {
    User newUser;
    String serverDomain;
    public AccountCreatedEvent(Object source, User newUser, String serverDomain) {
        super(source);
        this.newUser=newUser;
        this.serverDomain=serverDomain;
    }

}
