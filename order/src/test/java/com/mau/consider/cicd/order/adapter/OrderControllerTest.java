package com.mau.consider.cicd.adapter;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

import com.mau.consider.cicd.domain.Order;

import lombok.RequiredArgsConstructor;

class OrderControllerTest {

  @DisplayName("getテスト")
  @Nested
  @RequiredArgsConstructor
  class Get {

    private final OrderController target = new OrderController();

    @DisplayName("成功時")
    @Test
    void success() {
      var ret = target.get(1L);
      assertEquals(HttpStatus.OK, ret.getStatusCode());
      assertEquals(Order.createTestData(), ret.getBody());
    }

  }  
}
