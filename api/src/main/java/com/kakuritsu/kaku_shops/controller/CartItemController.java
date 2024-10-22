package com.kakuritsu.kaku_shops.controller;

import com.kakuritsu.kaku_shops.dto.CartDto;
import com.kakuritsu.kaku_shops.exceptions.CartOperationException;
import com.kakuritsu.kaku_shops.model.Cart;
import com.kakuritsu.kaku_shops.model.User;
import com.kakuritsu.kaku_shops.response.ApiResponse;
import com.kakuritsu.kaku_shops.service.cart.CartItemService;
import com.kakuritsu.kaku_shops.service.cart.CartService;
import com.kakuritsu.kaku_shops.service.user.IUserService;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@RestController
@RequestMapping("${api.prefix}/cart-items")
@RequiredArgsConstructor
public class CartItemController {

    private final CartItemService cartItemService;
    private final CartService cartService;
    private final IUserService userService;


    @PostMapping
    public ResponseEntity<ApiResponse> addItemToCart(@RequestParam Long productId, @RequestParam int quantity){
        try {
            User user = userService.getAuthenticatedUser();
            Cart cart = Optional.ofNullable(user.getCart()).orElseGet(()->cartService.initializeNewCart(user));
            Cart updatedCart = cartItemService.addItemToCart(cart.getId(),productId,quantity);
            CartDto cartDto = cartService.convertToDto(updatedCart);
            return ResponseEntity.ok().body(new ApiResponse("Success", cartDto));
        } catch (CartOperationException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(),null));
        }
          catch(JwtException e){
            return ResponseEntity.status(UNAUTHORIZED).body(new ApiResponse(e.getMessage(),null));
          }
    }
    @DeleteMapping
    public ResponseEntity<ApiResponse> removeItemFromCart(@RequestParam Long cartId, @RequestParam Long productId){
        try {
            cartItemService.removeItemFromCart(cartId, productId);
            return ResponseEntity.ok().body(new ApiResponse("Deleted",null));
        } catch (CartOperationException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(),null));
        }
    }
    @PutMapping
    public ResponseEntity<ApiResponse> updateItemQuantity(@RequestParam Long cartId, @RequestParam Long productId, @RequestParam int quantity){
        try {
            cartItemService.updateItemQuantity(cartId,productId,quantity);
            return ResponseEntity.ok().body(new ApiResponse("Success",null));
        } catch (CartOperationException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(),null));
        }
    }


}

