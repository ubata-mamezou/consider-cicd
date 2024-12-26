package com.mau.consider.cicd.order.domain;

import jakarta.persistence.Id;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

/**
 * 受注明細.
 */
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
