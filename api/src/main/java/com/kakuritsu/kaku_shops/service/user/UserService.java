package com.kakuritsu.kaku_shops.service.user;

import com.kakuritsu.kaku_shops.dto.UserDto;
import com.kakuritsu.kaku_shops.event.EventPublisher;
import com.kakuritsu.kaku_shops.exceptions.AlreadyExistsException;
import com.kakuritsu.kaku_shops.exceptions.ResourceNotFoundException;
import com.kakuritsu.kaku_shops.model.User;
import com.kakuritsu.kaku_shops.repository.UserRepository;
import com.kakuritsu.kaku_shops.request.CreateUserRequest;
import com.kakuritsu.kaku_shops.request.UpdateUserRequest;
import com.kakuritsu.kaku_shops.security.jwt.JwtUtils;
import com.kakuritsu.kaku_shops.security.user.ShopUserDetails;
import com.kakuritsu.kaku_shops.security.user.ShopUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService implements IUserService{
    private final UserRepository userRepository;
    private final ModelMapper mapper;
    private final PasswordEncoder passwordEncoder;
    private final EventPublisher eventPublisher;
    private final JwtUtils jwtUtils;
    private final ShopUserDetailsService shopUserDetailsService;
    @Override
    public User getUserById(Long userId) {
      return userRepository.findById(userId)
                .orElseThrow(()-> new ResourceNotFoundException("User not found"));
    }

    @Override
    public User createUser(CreateUserRequest request) {
          User newUser = Optional.of(request)
                  .filter(req->!userRepository.existsByEmail(req.getEmail()))
                  .map(req->{
                      User user = new User();
                      user.setFirstName(req.getFirstName());
                      user.setLastName(req.getLastName());
                      user.setEmail(req.getEmail());
                      user.setPassword(passwordEncoder.encode(req.getPassword()));
                      return userRepository.save(user);
                          }) .orElseThrow(()-> new AlreadyExistsException("Oops" + request.getEmail() +" already exists"));
          eventPublisher.publishAccountCreatedEvent(newUser);
          return newUser;
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

    public User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email);
    }

    @Override
    public void activateUserByVerificationToken(String token) {
        String email = jwtUtils.getUsernameFromToken(token);
        if(email!=null) {
            User user = userRepository.findByEmailAndIsEnabledFalse(email).orElseThrow(()-> new ResourceNotFoundException("User doesn't exist or is already active"));
            user.setEnabled(true);
            userRepository.save(new User());
        }
    }


}
