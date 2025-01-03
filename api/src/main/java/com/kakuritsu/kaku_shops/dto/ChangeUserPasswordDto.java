package com.kakuritsu.kaku_shops.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangeUserPasswordDto {
    private String oldPassword;
    private String newPassword;
}
