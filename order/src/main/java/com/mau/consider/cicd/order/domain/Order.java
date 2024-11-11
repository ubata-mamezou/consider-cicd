package com.mau.consider.cicd.domain;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Id;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode
public class Order {
  @Id
  private Long id;
  private LocalDate orderAt;
  private LocalDate shippingAt;
  private List<OrderDetail> details;

  public static Order createTestData() {
    var order = new Order() {
      {
        setId(1L);
        setOrderAt(LocalDate.of(2024, 11, 1));
        setShippingAt(LocalDate.of(2024, 11, 30));
        setDetails(List.of(
            new OrderDetail() {
              {
                setOrderId(1L);
                setId(1L);
                setProductId(101L);
                setQuantity(11);
              }
            },
            new OrderDetail() {
              {
                setOrderId(1L);
                setId(2L);
                setProductId(102L);
                setQuantity(12);
              }
            },
            new OrderDetail() {
              {
                setOrderId(1L);
                setId(3L);
                setProductId(103L);
                setQuantity(13);
              }
            },
            new OrderDetail() {
              {
                setOrderId(1L);
                setId(4L);
                setProductId(104L);
                setQuantity(14);
              }
            },
            new OrderDetail() {
              {
                setOrderId(1L);
                setId(5L);
                setProductId(105L);
                setQuantity(15);
              }
            },
            new OrderDetail() {
              {
                setOrderId(1L);
                setId(6L);
                setProductId(106L);
                setQuantity(16);
              }
            },
            new OrderDetail() {
              {
                setOrderId(1L);
                setId(7L);
                setProductId(107L);
                setQuantity(17);
              }
            },
            new OrderDetail() {
              {
                setOrderId(1L);
                setId(8L);
                setProductId(108L);
                setQuantity(18);
              }
            },
            new OrderDetail() {
              {
                setOrderId(1L);
                setId(9L);
                setProductId(109L);
                setQuantity(19);
              }
            },
            new OrderDetail() {
              {
                setOrderId(1L);
                setId(10L);
                setProductId(110L);
                setQuantity(20);
              }
            },
            new OrderDetail() {
              {
                setOrderId(1L);
                setId(11L);
                setProductId(111L);
                setQuantity(21);
              }
            }));
      }
    };
    return order;
  }
}
