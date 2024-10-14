package com.kakuritsu.kaku_shops.data;

import com.kakuritsu.kaku_shops.model.User;
import com.kakuritsu.kaku_shops.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements ApplicationListener<ApplicationReadyEvent> {
    private final UserRepository userRepository;
    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        createDefaultUsersIfNotExists();
    }
    private void createDefaultUsersIfNotExists(){
        for(int i=1; i<=5; i++){
            String defaultEmail = "user"+i+"@gmail.com";
            if(userRepository.existsByEmail(defaultEmail)){
                continue;
            }
            User user = new User();
            user.setEmail(defaultEmail);
            user.setFirstName("Thodoros"+i);
            user.setLastName("Christof"+i);
            user.setPassword("HashedPassword"+i);
            userRepository.save(user);
            System.out.println("Default user " + i + " created successfully.");
        }

    }

}
