package com.kakuritsu.kaku_shops.data;

import com.kakuritsu.kaku_shops.model.Role;
import com.kakuritsu.kaku_shops.model.User;
import com.kakuritsu.kaku_shops.repository.RoleRepository;
import com.kakuritsu.kaku_shops.repository.UserRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Component
@Transactional
@RequiredArgsConstructor
public class UsersInitializer implements ApplicationListener<ApplicationReadyEvent> {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    @Override
    public void onApplicationEvent(@NonNull ApplicationReadyEvent event) {

        createDefaultRolesIfNotExists();
        createDefaultAdminIfNotExists();
        createDefaultUsersIfNotExists();
    }
    private void createDefaultUsersIfNotExists(){
        Role userRole = roleRepository.findByName("ROLE_USER");
        for(int i=1; i<=5; i++){
            String defaultEmail = "user"+i+"@gmail.com";
            if(userRepository.existsByEmail(defaultEmail)){
                continue;
            }
            User user = new User();
            user.setEmail(defaultEmail);
            user.setFirstName("Thodoros"+i);
            user.setLastName("Christof"+i);
            user.setRoles(Set.of(userRole));
            user.setPassword(passwordEncoder.encode("1"+i));
            userRepository.save(user);

        }
    }
    private void createDefaultAdminIfNotExists(){
        Role adminRole = roleRepository.findByName("ROLE_ADMIN");
        for(int i=1; i<=2; i++){
            String defaultEmail = "admin"+i+"@gmail.com";
            if(userRepository.existsByEmail(defaultEmail)){
                continue;
            }
            User user = new User();
            user.setEmail(defaultEmail);
            user.setFirstName("Admin"+i);
            user.setLastName("Admin"+i);
            user.setRoles(Set.of(adminRole));
            user.setPassword(passwordEncoder.encode("1"+i));
            userRepository.save(user);
          }
    }
    private void createDefaultRolesIfNotExists(){
        Set<String> defaultRoles = Set.of("ROLE_ADMIN", "ROLE_USER");
        defaultRoles.stream()
                .filter(role->roleRepository.findByName(role)==null)
                .map(Role::new).forEach(roleRepository::save);
    }

}
