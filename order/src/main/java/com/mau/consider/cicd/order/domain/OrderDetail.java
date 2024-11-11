package com.mau.consider.cicd.domain;

import jakarta.persistence.Id;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode
public class OrderDetail {
  private Long orderId;
  @Id
  private Long id;
  private Long productId;
  private int quantity;  
}
