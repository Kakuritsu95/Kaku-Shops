package com.kakuritsu.kaku_shops.dto;

import com.kakuritsu.kaku_shops.model.Address;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class UserDetailsDTO {
    private Long userId;
    private String firstName;
    private String email;
    private List<String> roles;
}
