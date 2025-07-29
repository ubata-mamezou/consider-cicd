import { Injectable } from '@nestjs/common';

import { Customer } from './customer';

/**
 * 顧客サービス。
 */
@Injectable()
export class CustomerService {
  private customers = new Map<number, Customer>();

  constructor() {
    this.customers.set(1, { id: 1, name: 'suzuki' });
    this.customers.set(2, { id: 2, name: 'sato' });
    this.customers.set(3, { id: 3, name: 'takahashi' });
  }

  /**
   * 顧客取得
   * @param id 顧客ID
   * @returns 顧客
   */
  get(id: number): Customer {
    return this.customers.get(id);
  }

  /**
   * 顧客登録/更新
   * @param customer 顧客
   */
  save(customer: Customer) {
    if (customer.id === null) customer.id = this.getId();
    this.customers.set(customer.id, customer);
  }

  private getId(): number {
    return (
      Array.from(this.customers.entries()).reduce((max, current) =>
        current[0] > max[0] ? current : max,
      )[0] + 1
    );
  }

  /**
   * 顧客削除
   * @param id 顧客ID
   */
  delete(id: number) {
    this.customers.delete(id);
  }
}
