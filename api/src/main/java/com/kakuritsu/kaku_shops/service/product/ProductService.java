package com.kakuritsu.kaku_shops.service.product;

import com.kakuritsu.kaku_shops.dto.CategoryDto;
import com.kakuritsu.kaku_shops.dto.ProductDto;
import com.kakuritsu.kaku_shops.dto.ProductsSearchResult;
import com.kakuritsu.kaku_shops.exceptions.AlreadyExistsException;
import com.kakuritsu.kaku_shops.exceptions.ResourceNotFoundException;
import com.kakuritsu.kaku_shops.exceptions.UnauthorizedActionException;
import com.kakuritsu.kaku_shops.model.Category;
import com.kakuritsu.kaku_shops.model.Product;
import com.kakuritsu.kaku_shops.model.ProductRating;
import com.kakuritsu.kaku_shops.model.User;
import com.kakuritsu.kaku_shops.repository.CategoryRepository;
import com.kakuritsu.kaku_shops.repository.OrderRepository;
import com.kakuritsu.kaku_shops.repository.ProductRatingRepository;
import com.kakuritsu.kaku_shops.repository.ProductRepository;
import com.kakuritsu.kaku_shops.request.AddProductRequest;
import com.kakuritsu.kaku_shops.request.FilterSortProductRequest;
import com.kakuritsu.kaku_shops.request.SearchProductsRequest;
import com.kakuritsu.kaku_shops.request.UpdateProductRequest;
import com.kakuritsu.kaku_shops.service.converter.ProductConverter;
import com.kakuritsu.kaku_shops.specificiation.ProductSpecs;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService implements IProductService{

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRatingRepository productRatingRepository;
    private final ProductConverter productConverter;
    private final OrderRepository orderRepository;
    private final ModelMapper mapper;

    @Override
    public Product addProduct(AddProductRequest request) {
         if(productExists(request)){
            throw new AlreadyExistsException(request.getBrand() + " " + request.getName() + " Already exists, you may update this product instead!");
        }
        Category category = Optional.ofNullable(categoryRepository.findByName(request.getCategory().getName())).orElseGet(()->{
            Category newCategory = new Category(request.getCategory().getName());
            return categoryRepository.save(newCategory);
        });
        request.setCategory(category);
        return productRepository.save(productConverter.convertAddProductRequestToProduct(request));
    }


    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Product id: " + id + " not found found"));
    }

    @Override
    public void deleteProductById(Long id) {
     productRepository.findById(id).
             ifPresentOrElse(productRepository::delete,
                     ()->{throw new ResourceNotFoundException("Product id: " + id + " not found found");});
    }

    @Override
    public Product updateProduct(UpdateProductRequest request, Long productId) {

        return productRepository.findById(productId)
                .map(existingProduct -> {
                    Category category = Optional.ofNullable(categoryRepository.findByName(request.getCategory())).orElse(new Category(request.getCategory()));
                    if(category.getName()!=null) existingProduct.setCategory(category);
                    return productConverter.convertProductUpdateRequestToProduct(request, existingProduct);
                })
                .map(productRepository :: save)
                .orElseThrow(()-> new ResourceNotFoundException("Product id:"  + productId + "not found found"));
    }

    @Override
    public double addRating(Long productId, User user, double userRating) {
        Long userHasPurchasedAndReceivedTheProduct = orderRepository.userHasPurchasedAndReceivedTheProduct(user.getId(),productId);
        if(userHasPurchasedAndReceivedTheProduct < 1){
            throw new UnauthorizedActionException("User has not received the product");
        }
        Product product = this.getProductById(productId);
        ProductRating rating = productRatingRepository.findByProductIdAndUserId(productId,user.getId()).orElseGet(()-> {
            ProductRating newRating = new ProductRating();
            newRating.setUser(user);
            newRating.setRating(userRating);
            newRating.setProduct(product);
            return newRating;
        });
        rating.setRating(userRating);
        product.updateAverageRating();
        productRatingRepository.save(rating);
        return rating.getRating();
    }

    @Override
    public List<ProductDto> getLatestProducts() {
        final int numberOfLatestProductsToGet = 9;
        List<Product> latestProducts = productRepository.findLatestProducts(numberOfLatestProductsToGet);
        return latestProducts.stream().map(product -> mapper.map(product,ProductDto.class)).toList();
    }
    @Override
    public List<ProductDto> getBestSellerProducts() {
        final int numberOfBestSellerProductsToGet = 9;
        List<Product> bestSellerProducts = productRepository.findBestSellerProducts(numberOfBestSellerProductsToGet);
        return bestSellerProducts.stream().map(product -> mapper.map(product,ProductDto.class)).toList();
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
    @Override
    public Page<ProductDto> getProductsByCategoryIdAndSearchParams(Long categoryId, FilterSortProductRequest request){
        Sort sort = Sort.by(Sort.Direction.ASC,"price");
        if(request.getSortBy()!=null) {
            String[] sortParts = request.getSortBy().split("-");
            String sortField = sortParts[0];
            Sort.Direction sortDirection = sortParts.length > 1 && sortParts[1].equalsIgnoreCase("asc")
                    ? Sort.Direction.ASC
                    : Sort.Direction.DESC;
            sort = Sort.by(sortDirection, sortField);
        }
        PageRequest pageRequest = PageRequest.of(request.getPage()-1, request.getSize(),sort);
        Page<Product> products = productRepository.findAll(ProductSpecs.productFilterSpecification(request, categoryId), pageRequest);
        return products.map(productConverter::convertProductToProductDto);    }

    @Override
    public Page<ProductDto> getProductsBySearchKeyword(String keyword) {
        Sort sort = Sort.by(Sort.Direction.ASC,"price");
        Page<Product> products = productRepository.findProductsBySearchKeyword(keyword, PageRequest.of(0,10, sort));
        return products.map(productConverter::convertProductToProductDto);
    }
    @Override
    public ProductsSearchResult getSearchResultsWithFilters(SearchProductsRequest searchRequest){
        Sort sort = Sort.by(Sort.Direction.ASC,"price");
        if(searchRequest.getSortBy()!=null) {
            String[] sortParts = searchRequest.getSortBy().split("-");
            String sortField = sortParts[0];

            Sort.Direction sortDirection = sortParts.length > 1 && sortParts[1].equalsIgnoreCase("asc")
                    ? Sort.Direction.ASC
                    : Sort.Direction.DESC;
            sort = Sort.by(sortDirection, sortField);
        }
        Set<String> relevantBrands = productRepository.findDistinctBrandsByKeyword(searchRequest.getKeyword(),searchRequest.getCategory());
        List<Category> relevantCategories = categoryRepository.findCategoriesByKeyword(searchRequest.getKeyword(), searchRequest.getBrand());
        Page<Product> products = productRepository.findAll(ProductSpecs.productsSearchResultSpecification(searchRequest),PageRequest.of(searchRequest.getPage()-1, searchRequest.getSize(),sort));
        Page<ProductDto> productDto = products.map(productConverter::convertProductToProductDto);
        List<CategoryDto>relevantCategoriesDto = relevantCategories.stream().map(category -> mapper.map(category,CategoryDto.class)).toList();
        return new ProductsSearchResult(productDto,relevantBrands,relevantCategoriesDto);

    }
      boolean productExists(AddProductRequest product){
     return productRepository.existsByNameAndBrand(product.getName(),product.getBrand());
    }
}
