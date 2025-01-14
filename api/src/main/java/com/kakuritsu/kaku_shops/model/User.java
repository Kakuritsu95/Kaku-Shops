package com.kakuritsu.kaku_shops.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;

@Entity
@NoArgsConstructor
@Setter
@Getter
@Table(name = "app_user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    @NaturalId
    private String email;
    private String password;
    private String phoneNumber;
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL,orphanRemoval = true)
    Cart cart;
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL,orphanRemoval = true)
    List<Order> orders;
    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(name = "user_roles"
            ,joinColumns = @JoinColumn(name = "user_id",referencedColumnName = "id")
            ,inverseJoinColumns = @JoinColumn(name = "role_id",referencedColumnName = "id"))
    private Collection<Role> roles = new HashSet<>();
    @OneToOne
    private Address address;
    @Column(columnDefinition = "BOOLEAN DEFAULT FALSE")
    private boolean isEnabled;
}
