package com.kakuritsu.kaku_shops.request;
import com.kakuritsu.kaku_shops.enums.ProofType;
import com.kakuritsu.kaku_shops.model.Address;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;


@Data
public class OrderRequest {
    @Email
    private String email;
    @Size(min=3, max = 16)
    private String firstName;
    @Size(min=3, max = 16)
    private String lastName;
    @Size(min = 10, max = 10)
    private String phoneNumber;
    @NotNull
    private ProofType proofType;
    @Valid
    private AddressRequest address;
}
