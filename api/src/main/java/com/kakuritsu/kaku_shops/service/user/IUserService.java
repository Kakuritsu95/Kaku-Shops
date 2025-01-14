package com.kakuritsu.kaku_shops.service.user;

import com.kakuritsu.kaku_shops.dto.ChangeUserPasswordDto;
import com.kakuritsu.kaku_shops.dto.UserDetailsDTO;
import com.kakuritsu.kaku_shops.model.User;
import com.kakuritsu.kaku_shops.request.CreateUserRequest;
import jakarta.servlet.http.HttpServletRequest;

public interface IUserService {
    User getUserById(Long userId);
    User createUser(CreateUserRequest createUserRequest, HttpServletRequest request);
    User updateUser(UserDetailsDTO userDetailsDTO);
    void changeUserPassword(ChangeUserPasswordDto changeUserPasswordDto);
    void deleteUser(Long userId);
    UserDetailsDTO convertUserToDto(User user);
    User getAuthenticatedUser();
    void activateUserByVerificationToken(String token);
}
