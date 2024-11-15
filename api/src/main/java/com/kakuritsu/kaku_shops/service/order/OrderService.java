package com.kakuritsu.kaku_shops.service.order;

import com.kakuritsu.kaku_shops.dto.OrderDto;
import com.kakuritsu.kaku_shops.enums.OrderStatus;
import com.kakuritsu.kaku_shops.exceptions.CartOperationException;
import com.kakuritsu.kaku_shops.exceptions.ResourceNotFoundException;
import com.kakuritsu.kaku_shops.model.*;
import com.kakuritsu.kaku_shops.repository.OrderRepository;
import com.kakuritsu.kaku_shops.repository.ProductRepository;
import com.kakuritsu.kaku_shops.request.AddressRequest;
import com.kakuritsu.kaku_shops.request.OrderRequest;
import com.kakuritsu.kaku_shops.service.address.IAddressService;
import com.kakuritsu.kaku_shops.service.cart.ICartService;
import com.kakuritsu.kaku_shops.service.user.IUserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService implements IOrderService {
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final ICartService cartService;
    private final ModelMapper mapper;
    private final IUserService userService;
    private final IAddressService addressService;
    @Transactional
    @Override
            public Order placeOrder(
                    OrderRequest orderRequest
                   ,HttpServletRequest request
                   ,HttpServletResponse response
                   ) {
            cartService.checkIfUserHasCartCookie(request);
            String cartSessionCookie = cartService.generateCartCookieOrGetIfExists(request,response);

            User user = userService.getAuthenticatedUser();
            Cart cart = cartService.getCartBySessionId(cartSessionCookie).orElseThrow(()->new CartOperationException("Cart doesn't exist please add items"));
            if(cart.getTotalAmount().compareTo(BigDecimal.ZERO)==0) {throw new RuntimeException("Cart is empty!");};
            cart.setUser(user);
            Address newAddress = createSaveAndReturnAddress(orderRequest.getAddress());
            Order order = createOrder(cart,orderRequest);
            order.setAddress(newAddress);
            List<OrderItem> orderItems = createOrderItems(order,cart);
            order.setOrderItems(new HashSet<>(orderItems));
            order.setTotalAmount(calculateTotalAmount(orderItems));
            cartService.clearCart(cart.getId());
            return orderRepository.save(order);

        }

private Address createSaveAndReturnAddress(AddressRequest address){
        Address newAddress = new Address();
        newAddress.setAddress(address.getAddress());
        newAddress.setCity(address.getCity());
        newAddress.setPostalCode(address.getPostalCode());
       return addressService.save(newAddress);

}


    private BigDecimal calculateTotalAmount(List<OrderItem> orderItems) {
       return orderItems.stream().reduce(BigDecimal.ZERO
               ,(acc,curr)-> acc.add(curr.getPrice().multiply(new BigDecimal(curr.getQuantity())))
               ,BigDecimal::add);
    }
    private Order createOrder(Cart cart, OrderRequest orderRequest){
        return   Order.builder()
                .user(cart.getUser())
                .orderStatus(OrderStatus.PENDING)
                .orderDate(LocalDate.now())
                .firstName(orderRequest.getEmail())
                .lastName(orderRequest.getLastName())
                .email(orderRequest.getEmail())
                .phoneNumber(orderRequest.getPhoneNumber())
                .proofType(orderRequest.getProofType())
                .build();
    }
    private List<OrderItem> createOrderItems(Order order, Cart cart) {
        return cart.getCartItems().stream().map(item -> {
            Product product = item.getProduct();
            product.setInventory(product.getInventory()-item.getQuantity());
            product.setSellCount(product.getSellCount() + item.getQuantity());
            productRepository.save(product);
            OrderItem newOrderItem = new OrderItem();
            newOrderItem.setOrder(order);
            newOrderItem.setPrice(item.getTotalPrice());
            newOrderItem.setProduct(product);
            newOrderItem.setQuantity(item.getQuantity());
            return newOrderItem;
        }).toList();
    }

    @Override
    public OrderDto getOrderById(Long orderId) {
        return orderRepository.findById(orderId)
                .map(this::convertToDto)
                .orElseThrow(()->new ResourceNotFoundException("Order not found"));
    }
    @Override
    public List<OrderDto> getUserOrders(Long userId){
       return orderRepository.findByUserId(userId).stream().map(this::convertToDto).toList();
    }
    @Override
    public OrderDto convertToDto(Order order){
        return mapper.map(order, OrderDto.class);
    }

}
