package com.mau.consider.cicd.order.adapter;

import com.mau.consider.cicd.order.domain.Order;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 受注コントローラー.
 */
@RestController
@RequestMapping("/orders")
@Slf4j
public class OrderController {

  @Value("${appenv.sample}")
  private String envName;

  /**
   * 受注取得.
   *
   * @param id 受注ID
   * @return 受注
   */
  @GetMapping("/{id}")
  public ResponseEntity<Order> get(@PathVariable Long id) {
    log.info("env name=%s".formatted(envName));
    return ResponseEntity
        .ok()
        .body(Order.createTestData());
  }

}
