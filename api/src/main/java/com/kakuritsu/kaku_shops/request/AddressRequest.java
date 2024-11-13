package com.kakuritsu.kaku_shops.request;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AddressRequest {
    private String address;
    private String city;
    @Size(min = 5, max = 5)
    private String postalCode;
}
