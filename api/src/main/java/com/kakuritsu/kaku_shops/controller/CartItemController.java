package com.kakuritsu.kaku_shops.controller;

import com.kakuritsu.kaku_shops.exceptions.CartOperationException;
import com.kakuritsu.kaku_shops.exceptions.ResourceNotFoundException;
import com.kakuritsu.kaku_shops.model.Cart;
import com.kakuritsu.kaku_shops.response.ApiResponse;
import com.kakuritsu.kaku_shops.service.cart.CartItemService;
import com.kakuritsu.kaku_shops.service.cart.CartService;
import com.kakuritsu.kaku_shops.service.product.IProductService;
import com.kakuritsu.kaku_shops.service.user.IUserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("${api.prefix}/cart-items")
@RequiredArgsConstructor
public class CartItemController {

    private final CartItemService cartItemService;
    private final CartService cartService;
    private final IUserService userService;
    private final IProductService productService;


    @PostMapping
    public ResponseEntity<ApiResponse> addItemToCart(
             @RequestParam Long productId
            ,@RequestParam int quantity
            ,HttpServletRequest request
            ,HttpServletResponse response)
    {
        try {
            String cartSessionId = cartService.generateCartCookieOrGetIfExists(request,response);
             Cart cart = cartService.getCartBySessionId(cartSessionId).orElseGet(()->cartService.initializeNewCart(cartSessionId));
             cartItemService.addItemToCart(cart.getId(),productId,quantity);
            return ResponseEntity.ok().body(new ApiResponse("found", cart));
        } catch(ResourceNotFoundException e) {
                return ResponseEntity.status(NOT_FOUND).body(new ApiResponse("",""));
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

