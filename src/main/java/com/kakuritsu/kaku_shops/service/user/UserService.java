package com.kakuritsu.kaku_shops.service.user;

import com.kakuritsu.kaku_shops.dto.UserDto;
import com.kakuritsu.kaku_shops.exceptions.AlreadyExistsException;
import com.kakuritsu.kaku_shops.exceptions.ResourceNotFoundException;
import com.kakuritsu.kaku_shops.model.User;
import com.kakuritsu.kaku_shops.repository.UserRepository;
import com.kakuritsu.kaku_shops.request.CreateUserRequest;
import com.kakuritsu.kaku_shops.request.UpdateUserRequest;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService implements IUserService{
    private final UserRepository userRepository;
    private final ModelMapper mapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User getUserById(Long userId) {
      return userRepository.findById(userId)
                .orElseThrow(()-> new ResourceNotFoundException("User not found"));
    }

    @Override
    public User createUser(CreateUserRequest request) {
          return Optional.of(request)
                  .filter(user->!userRepository.existsByEmail(request.getEmail()))
                  .map(req->{
                      User user = new User();
                      user.setFirstName(req.getFirstName());
                      user.setLastName(req.getLastName());
                      user.setEmail(req.getEmail());
                      user.setPassword(passwordEncoder.encode(req.getPassword()));
                      return userRepository.save(user);
                          }) .orElseThrow(()-> new AlreadyExistsException("Oops" + request.getEmail() +" already exists"));
    }

    @Override
    public User updateUser(UpdateUserRequest request, Long userId) {
        return userRepository.findById(userId).map(existingUser-> {
            existingUser.setFirstName(request.getFirstName());
            existingUser.setLastName(request.getLastName());
            return userRepository.save(existingUser);
        }).orElseThrow(()-> new ResourceNotFoundException("User not found"));
    }

    @Override
    public void deleteUser(Long userId) {
        userRepository.findById((userId)).ifPresentOrElse(userRepository::delete, ()-> {
            throw new ResourceNotFoundException("User not found");
        });
    }
    @Override
    public UserDto convertUserToDto(User user){
        return mapper.map(user, UserDto.class);
    }

    public User getAuthenticatedUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email);
    }
}
