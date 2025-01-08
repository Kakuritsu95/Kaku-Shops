package com.kakuritsu.kaku_shops.service.user;

import com.kakuritsu.kaku_shops.dto.ChangeUserPasswordDto;
import com.kakuritsu.kaku_shops.dto.UserDetailsDTO;
import com.kakuritsu.kaku_shops.event.EventPublisher;
import com.kakuritsu.kaku_shops.exceptions.AlreadyExistsException;
import com.kakuritsu.kaku_shops.exceptions.ResourceNotFoundException;
import com.kakuritsu.kaku_shops.exceptions.UnauthorizedActionException;
import com.kakuritsu.kaku_shops.model.Role;
import com.kakuritsu.kaku_shops.model.User;
import com.kakuritsu.kaku_shops.repository.UserRepository;
import com.kakuritsu.kaku_shops.request.CreateUserRequest;
import com.kakuritsu.kaku_shops.security.jwt.JwtUtils;
import com.kakuritsu.kaku_shops.security.user.ShopUserDetailsService;
import com.kakuritsu.kaku_shops.service.address.IAddressService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;


@Service
public class UserService implements IUserService{
    private final UserRepository userRepository;
    private final ModelMapper mapper;
    private final PasswordEncoder passwordEncoder;
    private final EventPublisher eventPublisher;
    private final JwtUtils jwtUtils;
    private final ShopUserDetailsService shopUserDetailsService;
    private final ModelMapper nonEmptyFieldsMapper;
    private final IAddressService addressService;
    public UserService(UserRepository userRepository,
                       ModelMapper mapper,
                       PasswordEncoder passwordEncoder,
                       EventPublisher eventPublisher,
                       JwtUtils jwtUtils,
                       ShopUserDetailsService shopUserDetailsService,
                       IAddressService addressService,
                       @Qualifier("skipEmptyPropertiesMapper") ModelMapper nonEmptyFieldsMapper) {
        this.userRepository = userRepository;
        this.mapper = mapper;
        this.passwordEncoder = passwordEncoder;
        this.eventPublisher = eventPublisher;
        this.jwtUtils = jwtUtils;
        this.shopUserDetailsService = shopUserDetailsService;
        this.nonEmptyFieldsMapper = nonEmptyFieldsMapper;
        this.addressService = addressService;
    }

    @Override
    public User getUserById(Long userId) {
      return userRepository.findById(userId)
                .orElseThrow(()-> new ResourceNotFoundException("User not found"));
    }

    @Override
    public User createUser(CreateUserRequest request) {
          Role role = new Role("ROLE_USER");
          User newUser = Optional.of(request)
                  .filter(req->!userRepository.existsByEmail(req.getEmail()))
                  .map(req->{
                      User user = new User();
                      user.setFirstName(req.getFirstName());
                      user.setLastName(req.getLastName());
                      user.setEmail(req.getEmail());
                      user.setPassword(passwordEncoder.encode(req.getPassword()));
                      user.setRoles(Set.of(role));
                      return userRepository.save(user);
                          }) .orElseThrow(()-> new AlreadyExistsException("Oops" + request.getEmail() +" already exists"));
          eventPublisher.publishAccountCreatedEvent(newUser);
          return newUser;
    }

    @Override
    public User updateUser(UserDetailsDTO userDetailsDTO) {
        User user = getAuthenticatedUser();
        nonEmptyFieldsMapper.map(userDetailsDTO,user);
        if(userDetailsDTO.getAddress()!=null){
            addressService.save(userDetailsDTO.getAddress());
        }
        userRepository.save(user);
        return user;
        }

    @Override
    public void changeUserPassword(ChangeUserPasswordDto changeUserPasswordDto) {
        User user  = getAuthenticatedUser();
        if(!passwordEncoder.matches(changeUserPasswordDto.getOldPassword(), user.getPassword())) throw new UnauthorizedActionException("Password is incorrect");
        user.setPassword(passwordEncoder.encode(changeUserPasswordDto.getNewPassword()));
        userRepository.save(user);
    }

    @Override
    public void deleteUser(Long userId) {
        userRepository.findById((userId)).ifPresentOrElse(userRepository::delete, ()-> {
            throw new ResourceNotFoundException("User not found");
        });
    }
    @Override
    public UserDetailsDTO convertUserToDto(User user){
        return mapper.map(user, UserDetailsDTO.class);
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
