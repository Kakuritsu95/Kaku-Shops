package com.kakuritsu.kaku_shops.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class UserDetailsDto {
    private Long userId;
    private String firstName;
    private String email;
    private List<String> roles;
}
