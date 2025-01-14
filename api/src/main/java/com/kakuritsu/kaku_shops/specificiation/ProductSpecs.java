package com.kakuritsu.kaku_shops.specificiation;

import com.kakuritsu.kaku_shops.model.Product;
import com.kakuritsu.kaku_shops.request.FilterSortProductRequest;
import com.kakuritsu.kaku_shops.request.SearchProductsRequest;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.Month;
import java.util.Date;


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
            if(request.isPopular()){
                Predicate isPopularPredicate = cb.greaterThan(root.get("sellCount"),300);
                predicate = cb.and(predicate,isPopularPredicate);
            }
            if(request.isNewArrivals()){
                LocalDate startOfYear = LocalDate.of(LocalDate.now().getYear(), Month.JANUARY, 1);
                Predicate isNewArrivalsPredicate = cb.greaterThanOrEqualTo(root.get("createdAt"),startOfYear);
                predicate = cb.and(predicate,isNewArrivalsPredicate);
            }




            return predicate;

        });
    }
    public static Specification<Product> productsSearchResultSpecification(SearchProductsRequest request){
        String keywordLikePattern = "%"+request.getKeyword()+"%";
        return (root, query, cb) -> {
            Predicate predicate;
             predicate = cb.like(cb.lower(root.get("name")),keywordLikePattern);

            if(request.getKeyword()!=null){
                Predicate brandLikePredicate = cb.like(cb.lower(root.get("brand")),keywordLikePattern);
                Predicate categoryLikePredicate = cb.like(cb.lower(root.get("category").get("name")),keywordLikePattern);
                predicate = cb.or(predicate,brandLikePredicate,categoryLikePredicate);
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
            if(request.getMinPrice()!=null){
                Predicate minPricePredicate = cb.greaterThanOrEqualTo(root.get("price"),request.getMinPrice());
                predicate = cb.and(predicate, minPricePredicate);
            }
            if(request.getMaxPrice()!=null){
                Predicate maxPricePredicate = cb.lessThanOrEqualTo(root.get("price"),request.getMaxPrice());
                predicate = cb.and(predicate, maxPricePredicate);
            }
            if(request.isPopular()){
                Predicate isPopularPredicate = cb.greaterThan(root.get("sellCount"),300);
                predicate = cb.and(predicate,isPopularPredicate);
            }
            if(request.isNewArrivals()){
                LocalDate startOfYear = LocalDate.of(LocalDate.now().getYear(), Month.JANUARY, 1);
                Predicate isNewArrivalsPredicate = cb.greaterThanOrEqualTo(root.get("createdAt"),startOfYear);
                predicate = cb.and(predicate,isNewArrivalsPredicate);
            }

            return predicate;
        };
    }

}
