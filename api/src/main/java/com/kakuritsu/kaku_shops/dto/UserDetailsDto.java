package com.kakuritsu.kaku_shops.dto;

import com.kakuritsu.kaku_shops.model.Address;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDetailsDTO {
    private Long userId;
    @NotNull
    private String firstName;
    @NotNull
    private String lastName;
    @Email
    private String email;
    @NotNull
    private String phoneNumber;
    private Address address;
    private List<String> roles;


    public UserDetailsDTO(Long userId, String firstName, String email, List<String> roles) {
        this.userId = userId;
        this.firstName = firstName;
        this.email = email;
        this.roles = roles;
    }
}
