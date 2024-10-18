package com.kakuritsu.kaku_shops.repository;

import com.kakuritsu.kaku_shops.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image,Long> {
}
