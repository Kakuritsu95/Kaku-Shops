package com.kakuritsu.kaku_shops.service.user;

import com.kakuritsu.kaku_shops.dto.UserDto;
import com.kakuritsu.kaku_shops.model.User;
import com.kakuritsu.kaku_shops.request.CreateUserRequest;
import com.kakuritsu.kaku_shops.request.UpdateUserRequest;

public interface IUserService {
    User getUserById(Long userId);
    User createUser(CreateUserRequest request);
    User updateUser(UpdateUserRequest request, Long userId);
    void deleteUser(Long userId);

    UserDto convertUserToDto(User user);
}
