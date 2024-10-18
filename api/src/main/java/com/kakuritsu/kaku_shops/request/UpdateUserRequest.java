package com.kakuritsu.kaku_shops.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class UpdateUserRequest {
    @NotEmpty
    private String firstName;
    @NotEmpty
    private String lastName;
}
