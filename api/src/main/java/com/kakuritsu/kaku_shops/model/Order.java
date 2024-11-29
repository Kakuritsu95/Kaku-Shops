package com.kakuritsu.kaku_shops.model;

import com.kakuritsu.kaku_shops.enums.OrderStatus;
import com.kakuritsu.kaku_shops.enums.ProofType;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "`order`")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate orderDate;
    private BigDecimal totalAmount;
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;
    @OneToMany(mappedBy = "order",cascade = CascadeType.ALL,orphanRemoval = true)
    private Set<OrderItem> orderItems = new HashSet<>();
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;
    private String phoneNumber;
    private String email;
    private String firstName;
    private String lastName;
    private String refCode;
    @OneToOne
    private Address address;
    @Enumerated(EnumType.STRING)
    private ProofType proofType;
}
