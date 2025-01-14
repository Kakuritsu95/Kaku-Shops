package com.kakuritsu.kaku_shops.controller;

import com.kakuritsu.kaku_shops.dto.CartDto;
import com.kakuritsu.kaku_shops.exceptions.CartOperationException;
import com.kakuritsu.kaku_shops.service.cookie.CookieManagementService;
import com.kakuritsu.kaku_shops.model.Cart;
import com.kakuritsu.kaku_shops.response.ApiResponse;
import com.kakuritsu.kaku_shops.service.cart.CartItemService;
import com.kakuritsu.kaku_shops.service.cart.ICartService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("${api.prefix}/cart-items")
@RequiredArgsConstructor
public class CartItemController {

    private final CartItemService cartItemService;
    private final ICartService cartService;
    private final ModelMapper mapper;
    private final CookieManagementService cookieManagementService;


    @PostMapping
    public ResponseEntity<ApiResponse> addItemToCart(
            @RequestParam Long productId,
            @RequestParam int quantity,
            HttpServletRequest request,
            HttpServletResponse response)
    {

            String guestCartId = cookieManagementService.getCookieValueByName(request, "cart")
                    .orElseGet(() -> cookieManagementService.generateAndReturnCookieByNameAndValue(response, "cart", null));

            Cart cart = cartItemService.addItemToCart(guestCartId, productId, quantity);
            CartDto cartDto = mapper.map(cart, CartDto.class);
            return ResponseEntity.ok().body(new ApiResponse("found", cartDto));

    }

    @DeleteMapping
    public ResponseEntity<ApiResponse> removeItemFromCart(
            @RequestParam Long productId,
            HttpServletRequest request
    ){
        try {
            String guestCartId =  cookieManagementService.getCookieValueByName(request,"cart").orElseThrow(()->new CartOperationException("Cart does not exist"));
            cartItemService.removeItemFromCart(guestCartId, productId);
            return ResponseEntity.ok().body(new ApiResponse("Deleted",null));
        } catch (CartOperationException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(),null));
        }
    }
    @PatchMapping
    public ResponseEntity<ApiResponse> updateItemQuantity(
            @RequestParam Long productId,
            @RequestParam int quantity,
            HttpServletRequest request,
            HttpServletResponse response
    ){

            cartService.checkIfUserHasCartCookie(request);
            String cartSessionId = cartService.generateCartCookieOrGetIfExists(request,response);
            cartItemService.updateItemQuantity(cartSessionId,productId,quantity);
            return ResponseEntity.ok().body(new ApiResponse("Success",null));

    }


}

