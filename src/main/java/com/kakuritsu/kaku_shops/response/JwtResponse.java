package com.kakuritsu.kaku_shops.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class JwtResponse {
    private Long id;
    private String token;
}
