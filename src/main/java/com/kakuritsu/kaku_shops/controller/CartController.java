package com.kakuritsu.kaku_shops.controller;

import com.kakuritsu.kaku_shops.exceptions.ResourceNotFoundException;
import com.kakuritsu.kaku_shops.model.Cart;
import com.kakuritsu.kaku_shops.request.AddCartItemRequest;
import com.kakuritsu.kaku_shops.response.ApiResponse;
import com.kakuritsu.kaku_shops.service.cart.ICartItemService;
import com.kakuritsu.kaku_shops.service.cart.ICartService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/carts")
public class CartController {
    private final ICartService cartService;

    @GetMapping("{cartId}")
    public ResponseEntity<ApiResponse> getCart(@PathVariable Long cartId){
        try {
            Cart cart = cartService.getCartById(cartId);
            return ResponseEntity.ok().body(new ApiResponse("Success", cart));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(),null));
        }
    }
    @DeleteMapping("{cartId}")
    public ResponseEntity<ApiResponse> clearCart(@PathVariable Long cartId){
        try {
            cartService.clearCart(cartId);
            return ResponseEntity.ok().body(new ApiResponse("Cleared the cart",null));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(),null));
        }
    }
    @GetMapping("/total-price/{cartId}")
    public ResponseEntity<ApiResponse> getTotalPrice(@PathVariable Long cartId){
        try {
            BigDecimal totalPrice =  cartService.getTotalPrice(cartId);
            return ResponseEntity.ok().body(new ApiResponse("Cleared the cart",totalPrice));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(),null));
        }
    }


}
