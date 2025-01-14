package com.kakuritsu.kaku_shops.exceptions;

import com.kakuritsu.kaku_shops.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import static org.springframework.http.HttpStatus.FORBIDDEN;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<String> handleAccessDeniedException(AccessDeniedException ex){
        String message = "You don't have permission to this action";
        return new ResponseEntity<>(message, FORBIDDEN);
    }
    @ExceptionHandler(UnauthorizedActionException.class)
    public ResponseEntity<String> handleUnauthorizedActionException(UnauthorizedActionException ex){
        return new ResponseEntity<>(ex.getMessage(), FORBIDDEN);
    }
    @ExceptionHandler(ProductOutOfStockException.class)
    public ResponseEntity<ApiResponse> handleProductOurOfStockException(ProductOutOfStockException ex){
        return ResponseEntity.badRequest().body(new ApiResponse(ex.getMessage(),null));
    }
}
