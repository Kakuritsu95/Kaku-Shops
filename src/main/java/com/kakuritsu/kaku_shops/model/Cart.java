package com.kakuritsu.kaku_shops.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private BigDecimal totalAmount = BigDecimal.ZERO;
    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<CartItem> cartItems;

    public void addItem(CartItem item){
        if(this.cartItems==null){
            this.cartItems= new HashSet<CartItem>();
        }
        this.cartItems.add(item);
        item.setCart(this);
        updateTotalAmount();
    }
    public void removeItem(CartItem item){
        this.cartItems.remove(item);
        item.setCart(null);
        updateTotalAmount();
    }

    public void updateTotalAmount() {
        this.totalAmount = this.cartItems.stream().map(cartItem -> {
            BigDecimal unitPrice = cartItem.getUnitPrice();
            if(unitPrice==null){
                return BigDecimal.ZERO;
            }
            return unitPrice.multiply(BigDecimal.valueOf(cartItem.getQuantity()));
        }).reduce(BigDecimal.ZERO, BigDecimal::add);
    }


}
