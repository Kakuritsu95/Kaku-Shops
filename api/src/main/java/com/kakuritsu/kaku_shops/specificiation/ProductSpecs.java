package com.kakuritsu.kaku_shops.specificiation;

import com.kakuritsu.kaku_shops.model.Product;
import com.kakuritsu.kaku_shops.request.FilterSortProductRequest;
import com.kakuritsu.kaku_shops.request.SearchProductsRequest;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;


public class ProductSpecs {
    public static Specification<Product> productFilterSpecification(FilterSortProductRequest request,Long categoryId) {

        return ((root, query, cb) -> {
            Predicate predicate = cb.conjunction();

            if(categoryId!=null){
                Predicate categoryEqualPredicate = cb.equal(root.get("category").get("id"),categoryId);
                predicate = cb.and(predicate, categoryEqualPredicate);
            }
            if(request.getBrand()!=null){
                Predicate brandEqualsPredicate = cb.equal(root.get("brand"),request.getBrand());
                predicate = cb.and(predicate, brandEqualsPredicate);
            }
            if(request.getMinPrice()!=null){
                Predicate minPricePredicate = cb.greaterThanOrEqualTo(root.get("price"),request.getMinPrice());
                predicate = cb.and(predicate, minPricePredicate);
            }
            if(request.getMaxPrice()!=null){
               Predicate maxPricePredicate = cb.lessThanOrEqualTo(root.get("price"),request.getMaxPrice());
               predicate = cb.and(predicate, maxPricePredicate);
            }
            if(request.isInStock()){
               Predicate inStockPredicate = cb.greaterThan(root.get("inventory"),0);
               predicate = cb.and(predicate, inStockPredicate);
            }




            return predicate;

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
