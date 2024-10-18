package com.kakuritsu.kaku_shops.service.order;

import com.kakuritsu.kaku_shops.dto.OrderDto;
import com.kakuritsu.kaku_shops.enums.OrderStatus;
import com.kakuritsu.kaku_shops.exceptions.ResourceNotFoundException;
import com.kakuritsu.kaku_shops.model.Cart;
import com.kakuritsu.kaku_shops.model.Order;
import com.kakuritsu.kaku_shops.model.OrderItem;
import com.kakuritsu.kaku_shops.model.Product;
import com.kakuritsu.kaku_shops.repository.OrderRepository;
import com.kakuritsu.kaku_shops.repository.ProductRepository;
import com.kakuritsu.kaku_shops.service.cart.CartService;
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
    private final CartService cartService;
    private final ModelMapper mapper;

    @Override
            public Order placeOrder(Long userId) {
            Cart cart = cartService.getCartByUserId(userId);
            System.out.println(cart.getTotalAmount());
             System.out.println(cart.getTotalAmount());
            if(cart.getTotalAmount().compareTo(BigDecimal.ZERO)==0) {throw new RuntimeException("Cart is empty!");};
            System.out.println(cart.getTotalAmount().compareTo(BigDecimal.ZERO)==0);
            Order order = createOrder(cart);
            List<OrderItem> orderItems = createOrderItems(order,cart);
            order.setOrderItems(new HashSet<>(orderItems));
            order.setTotalAmount(calculateTotalAmount(orderItems));
            cartService.clearCart(cart.getId());
            return orderRepository.save(order);
        }


    private BigDecimal calculateTotalAmount(List<OrderItem> orderItems) {
       return orderItems.stream().reduce(BigDecimal.ZERO
               ,(acc,curr)-> acc.add(curr.getPrice().multiply(new BigDecimal(curr.getQuantity())))
               ,BigDecimal::add);
    }
    private Order createOrder(Cart cart){
        Order newOrder = new Order();
        newOrder.setOrderStatus(OrderStatus.PENDING);
        newOrder.setOrderDate(LocalDate.now());
        newOrder.setUser(cart.getUser());
        return newOrder;
    }
    private List<OrderItem> createOrderItems(Order order, Cart cart) {
        return cart.getCartItems().stream().map(item -> {
            Product product = item.getProduct();
            product.setInventory(product.getInventory()-item.getQuantity());
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
