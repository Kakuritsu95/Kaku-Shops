package com.kakuritsu.kaku_shops.controller;

import com.kakuritsu.kaku_shops.dto.CartDto;
import com.kakuritsu.kaku_shops.exceptions.ResourceNotFoundException;
import com.kakuritsu.kaku_shops.model.Cart;
import com.kakuritsu.kaku_shops.response.ApiResponse;
import com.kakuritsu.kaku_shops.service.cart.ICartService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/carts")
public class CartController {
    private final ICartService cartService;
    private final ModelMapper mapper;

    @GetMapping
    public ResponseEntity<ApiResponse> getCartByCookieSession(
           HttpServletRequest request,
            HttpServletResponse response
    )
    {
        try {
            cartService.checkIfUserHasCartCookie(request);
            String cartSessionId = cartService.generateCartCookieOrGetIfExists(request,response);
            Cart cart = cartService.getCartBySessionId(cartSessionId).orElseThrow(()->new ResourceNotFoundException("Cart was not found"));
            CartDto cartDto = mapper.map(cart,CartDto.class);
            return ResponseEntity.ok().body(new ApiResponse("Success", cartDto));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(),null));
        }
    }
    @GetMapping("user/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse> getCartByUserId(@PathVariable Long userId){
        try {
            Cart cart = cartService.getCartByUserId(userId);
            CartDto cartDto = mapper.map(cart, CartDto.class);
            return ResponseEntity.ok().body(new ApiResponse("Success",cartDto));
        } catch(ResourceNotFoundException e) {
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
            return ResponseEntity.ok().body(new ApiResponse("Success",totalPrice));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(),null));
        }
    }


}
