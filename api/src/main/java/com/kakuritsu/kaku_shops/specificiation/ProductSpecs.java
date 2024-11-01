package com.kakuritsu.kaku_shops.specificiation;

import com.kakuritsu.kaku_shops.model.Product;
import com.kakuritsu.kaku_shops.request.FilterSortProductRequest;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;


public class ProductSpecs {
    public static Specification<Product> ProductFilterSpecification(FilterSortProductRequest request,Long categoryId){
        return ((root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
             if(categoryId!=null){
                predicates.add(criteriaBuilder.equal(root.get("category").get("id"),categoryId));            
            }
            if(request.getBrand()!=null){
                predicates.add(criteriaBuilder.equal(root.get("brand"),request.getBrand()));
            }
            if(request.getMinPrice()!=null){
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("price"),request.getMinPrice()));
            }
            if(request.getMaxPrice()!=null){
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"),request.getMaxPrice()));
            }
            if(request.isInStock()){
                predicates.add(criteriaBuilder.greaterThan(root.get("inventory"),0));
            }

             Predicate andPredicate = criteriaBuilder.and(predicates.toArray(new Predicate[0]));

            return criteriaBuilder.and(andPredicate);

        });
    }


}
