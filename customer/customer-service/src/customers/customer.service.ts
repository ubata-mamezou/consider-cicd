import { Injectable } from '@nestjs/common';

import { Customer } from './domain/customer.entity';
import { SearchCustomerCondition } from './dto/search-customer-condition.dto';

@Injectable()
export class CustomerService {
  private customers: Customer[];

  constructor() {
    this.customers = [] as Customer[];
    this.customers.push(new Customer(1, 'A', 'suzuki', 'tokyo'));
    this.customers.push(new Customer(2, 'A', 'sato', 'kanagawa'));
    this.customers.push(new Customer(3, 'B', 'takahashi', 'saitama'));
    this.customers.push(new Customer(4, 'B', 'yamaguchi', 'tokyo'));
    this.customers.push(new Customer(5, 'C', 'aoki', 'tokyo'));
  }

  /**
   * 顧客取得
   *
   * @param id 顧客ID
   * @returns 顧客
   */
  get(id: number) {
    return this.customers.find((customer) => customer._id === id);
  }

  /**
   * 顧客検索
   *
   * @param condition 顧客検索条件
   * @returns 顧客リスト
   */
  list(condition: SearchCustomerCondition) {
    console.log(condition);
    console.log(condition._rank);
    return this.customers.filter(
      (customer) => customer._rank === condition._rank,
    );
  }
}
