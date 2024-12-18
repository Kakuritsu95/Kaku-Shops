package com.kakuritsu.kaku_shops.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GuestContactUsRequest {
    private String email;
    private String firstName;
    private String lastName;
    private String message;
    private String orderRefCode;
    private String recaptchaToken;
    private String subject;
}
