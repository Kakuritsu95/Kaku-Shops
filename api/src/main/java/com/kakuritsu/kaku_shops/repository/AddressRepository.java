package com.kakuritsu.kaku_shops.repository;

import com.kakuritsu.kaku_shops.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address,Long> {
}
