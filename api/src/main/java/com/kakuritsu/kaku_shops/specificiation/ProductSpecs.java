package com.kakuritsu.kaku_shops.specificiation;

import com.kakuritsu.kaku_shops.model.Product;
import com.kakuritsu.kaku_shops.request.FilterSortProductRequest;
import com.kakuritsu.kaku_shops.request.SearchProductsRequest;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;


public class ProductSpecs {
    public static Specification<Product> productFilterSpecification(FilterSortProductRequest request,Long categoryId) {
        List<Predicate> predicates = new ArrayList<>();
        return ((root, query, cb) -> {
            if(categoryId!=null){
                predicates.add(cb.equal(root.get("category").get("id"),categoryId));
            }
            if(request.getBrand()!=null){
                predicates.add(cb.equal(root.get("brand"),request.getBrand()));
            }
            if(request.getMinPrice()!=null){
                predicates.add(cb.greaterThanOrEqualTo(root.get("price"),request.getMinPrice()));
            }
            if(request.getMaxPrice()!=null){
                predicates.add(cb.lessThanOrEqualTo(root.get("price"),request.getMaxPrice()));
            }
            if(request.isInStock()){
                predicates.add(cb.greaterThan(root.get("inventory"),0));
            }

             Predicate andPredicate = cb.and(predicates.toArray(new Predicate[0]));

            return cb.and(andPredicate);

        });
    }
    public static Specification<Product> productsSearchResultSpecification(SearchProductsRequest request){
        String keywordLikePattern = "%"+request.getKeyword()+"%";
        return (root, query, cb) -> {
            Predicate predicate;
            Predicate nameLikePredicate = cb.like(root.get("name"),keywordLikePattern);
            predicate = cb.like(root.get("name"),request.getKeyword());
            if(request.getKeyword()!=null){
                Predicate brandLikePredicate = cb.like(root.get("brand"),keywordLikePattern);
                Predicate categoryLikePredicate = cb.like(root.get("category").get("name"),keywordLikePattern);
                predicate = cb.or(nameLikePredicate,brandLikePredicate,categoryLikePredicate);
            }
            if(request.isInStock()){
                Predicate isProductInStockPredicate = cb.greaterThan(root.get("inventory"),0);
                predicate = cb.and(predicate, isProductInStockPredicate);
            }
            if(request.getBrand()!=null && !request.getBrand().isEmpty()){
                Predicate brandEqualPredicate = cb.equal(root.get("brand"),request.getBrand());
               predicate = cb.and(predicate, brandEqualPredicate);
            }
            if(request.getCategory()!=null && !request.getCategory().isEmpty()){
                Predicate categoryEqualPredicate = cb.equal(root.get("category").get("name"),request.getCategory());
                predicate = cb.and(predicate, categoryEqualPredicate);
            }

            return predicate;
        };
    }

}
