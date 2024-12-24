package com.kakuritsu.kaku_shops.controller;

import com.kakuritsu.kaku_shops.dto.OrderDto;
import com.kakuritsu.kaku_shops.exceptions.ResourceNotFoundException;
import com.kakuritsu.kaku_shops.exceptions.UnauthorizedActionException;
import com.kakuritsu.kaku_shops.model.Order;
import com.kakuritsu.kaku_shops.model.User;
import com.kakuritsu.kaku_shops.request.OrderRequest;
import com.kakuritsu.kaku_shops.response.ApiResponse;
import com.kakuritsu.kaku_shops.service.order.IOrderService;
import com.kakuritsu.kaku_shops.service.user.IUserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/orders")
public class OrderController {
    private final IOrderService orderService;
    private final IUserService userService;

    @PostMapping
    public ResponseEntity<ApiResponse> createOrder(
             @RequestBody @Valid OrderRequest orderRequest
            ,HttpServletRequest request
            ,HttpServletResponse response){
        try {
            Order order = orderService.placeOrder(orderRequest,request,response);
            OrderDto orderDto = orderService.convertToDto(order);
            return ResponseEntity.ok().body(new ApiResponse("Success!", orderDto.getRefCode()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(),null));
        }
    }

    @GetMapping("/{orderId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse> getOrderById(@PathVariable Long orderId){
        try {
            OrderDto order = orderService.getOrderById(orderId);
            return ResponseEntity.ok().body(new ApiResponse("Found!", order));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(),null));
        }
    }
    @GetMapping("/ref-code/{refCode}")
    @PostAuthorize("returnObject.body.data!=null && returnObject.body.data.userId == principal.id")
    public ResponseEntity<ApiResponse> getOrderByRefCode(@PathVariable String refCode){
        try {
            OrderDto order = orderService.getOrderByRefCode(refCode);
            return ResponseEntity.ok().body(new ApiResponse("order found",order));
        } catch (Exception e) {
          return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(),null));
        }

    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse> getOrdersByUserId(@PathVariable Long userId, @RequestParam int page){
        try {
            Page<OrderDto> userOrders = orderService.getByUserId(userId, page);
            return ResponseEntity.ok().body(new ApiResponse("Found!", userOrders));
        } catch (Exception e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(),null));
        }

    }
    @GetMapping("/history")
    public ResponseEntity<ApiResponse> getAuthenticatedUserOrders(@RequestParam(defaultValue = "1") int page){
        try {
            User authenticatedUser =  userService.getAuthenticatedUser();
            if(authenticatedUser==null) throw new UnauthorizedActionException("Authentication error, please login to see your order history");
            Page<OrderDto> userOrders = orderService.getByUserId(authenticatedUser.getId(),page);
            return ResponseEntity.ok().body(new ApiResponse("Found!", userOrders));
        } catch (UnauthorizedActionException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(),null));
        }

    }
}
