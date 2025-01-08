package com.kakuritsu.kaku_shops.service.address;

import com.kakuritsu.kaku_shops.model.Address;
import com.kakuritsu.kaku_shops.repository.AddressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AddressService implements IAddressService {
   private final AddressRepository addressRepository;

   public Address save(Address address){
       return addressRepository.save(address);
   }

}
