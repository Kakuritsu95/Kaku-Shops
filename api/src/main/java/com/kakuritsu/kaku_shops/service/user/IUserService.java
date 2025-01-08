package com.kakuritsu.kaku_shops.service.user;

import com.kakuritsu.kaku_shops.dto.ChangeUserPasswordDto;
import com.kakuritsu.kaku_shops.dto.UserDetailsDTO;
import com.kakuritsu.kaku_shops.model.User;
import com.kakuritsu.kaku_shops.request.CreateUserRequest;

public interface IUserService {
    User getUserById(Long userId);
    User createUser(CreateUserRequest request);
    User updateUser(UserDetailsDTO userDetailsDTO);
    void changeUserPassword(ChangeUserPasswordDto changeUserPasswordDto);
    void deleteUser(Long userId);
    UserDetailsDTO convertUserToDto(User user);
    User getAuthenticatedUser();
    void activateUserByVerificationToken(String token);
}
