package com.kakuritsu.kaku_shops.controller;

import com.kakuritsu.kaku_shops.dto.UserDto;
import com.kakuritsu.kaku_shops.exceptions.AlreadyExistsException;
import com.kakuritsu.kaku_shops.exceptions.ResourceNotFoundException;
import com.kakuritsu.kaku_shops.model.User;
import com.kakuritsu.kaku_shops.request.CreateUserRequest;
import com.kakuritsu.kaku_shops.request.UpdateUserRequest;
import com.kakuritsu.kaku_shops.response.ApiResponse;
import com.kakuritsu.kaku_shops.service.user.IUserService;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/users")
public class UserController {
    private final IUserService userService;
     @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse> getUserById(@PathVariable Long userId) {
         try {
             User user = userService.getUserById(userId);
             UserDto userDto = userService.convertUserToDto(user);
             return ResponseEntity.ok().body(new ApiResponse("Found",userDto));
         } catch (ResourceNotFoundException e) {
             return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(),null));
         }
     }
     @PostMapping
     public ResponseEntity<ApiResponse> createUser(@RequestBody @Valid CreateUserRequest request){
         try {
             User user = userService.createUser(request);
             UserDto userDto = userService.convertUserToDto(user);
             return ResponseEntity.ok().body(new ApiResponse("User successfully created", userDto));
         } catch (AlreadyExistsException e) {
             return ResponseEntity.status(CONFLICT).body(new ApiResponse(e.getMessage(),null));
         }
     }
    @PutMapping("/{userId}")
    public ResponseEntity<ApiResponse> updateUser(@RequestBody @Valid UpdateUserRequest request, @PathVariable Long userId){
        try {
            User user = userService.updateUser(request, userId);
            UserDto userDto = userService.convertUserToDto(user);
            return ResponseEntity.ok().body(new ApiResponse("User successfully updated!", userDto));
        } catch (ResourceNotFoundException | ConstraintViolationException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(),null));
        }
    }
    @DeleteMapping("/{userId}")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable Long userId){
        try {
            userService.deleteUser(userId);
            return ResponseEntity.ok().body(new ApiResponse("Deleted user",null ));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(),null));
        }
    }

}
