package com.kakuritsu.kaku_shops.controller;

import com.kakuritsu.kaku_shops.dto.ChangeUserPasswordDto;
import com.kakuritsu.kaku_shops.dto.UserDetailsDTO;
import com.kakuritsu.kaku_shops.exceptions.AlreadyExistsException;
import com.kakuritsu.kaku_shops.exceptions.ResourceNotFoundException;
import com.kakuritsu.kaku_shops.exceptions.UnauthorizedActionException;
import com.kakuritsu.kaku_shops.model.Role;
import com.kakuritsu.kaku_shops.model.User;
import com.kakuritsu.kaku_shops.request.CreateUserRequest;
import com.kakuritsu.kaku_shops.response.ApiResponse;
import com.kakuritsu.kaku_shops.service.user.IUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/users")
public class UserController {
    private final IUserService userService;

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse> getUserById(@PathVariable Long userId) {
         try {
             User user = userService.getUserById(userId);
             UserDetailsDTO userDto = userService.convertUserToDto(user);
             userDto.setRoles(user.getRoles().stream().map(Role::getName).collect(Collectors.toList()));
             return ResponseEntity.ok().body(new ApiResponse("Found",userDto));
         } catch (ResourceNotFoundException e) {
             return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(),null));
         }
     }
     @PostMapping
     public ResponseEntity<ApiResponse> createUser(@RequestBody @Valid CreateUserRequest request){
         try {
             User user = userService.createUser(request);
             UserDetailsDTO userDto = userService.convertUserToDto(user);
             return ResponseEntity.ok().body(new ApiResponse("User successfully created", userDto));
         } catch (AlreadyExistsException e) {
             return ResponseEntity.status(CONFLICT).body(new ApiResponse(e.getMessage(),null));
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

    @GetMapping("details")
    ResponseEntity<ApiResponse> getAuthUserDetails(){
          User user = userService.getAuthenticatedUser();
          UserDetailsDTO userDetailsDTO =  userService.convertUserToDto(user);
        return ResponseEntity.ok(new ApiResponse("",userDetailsDTO));
    }

    @PatchMapping("details")
    ResponseEntity<ApiResponse> updateUserDetails(@RequestBody UserDetailsDTO userDetailsDTO){
         User user = userService.getAuthenticatedUser();
         User updatedUser =  userService.updateUser(userDetailsDTO);
         System.out.println(user);
   return ResponseEntity.ok(new ApiResponse("success", updatedUser));
    }

    @PatchMapping("password")
    ResponseEntity<ApiResponse> changeAuthenticatedUserPassword(@RequestBody ChangeUserPasswordDto changeUserPasswordDto){
        try {
            userService.changeUserPassword(changeUserPasswordDto);
            return ResponseEntity.ok().body(new ApiResponse("success", null));
        } catch (UnauthorizedActionException e) {
            return ResponseEntity.status(UNAUTHORIZED).body(new ApiResponse(e.getMessage(), null));
        }

    }

}
