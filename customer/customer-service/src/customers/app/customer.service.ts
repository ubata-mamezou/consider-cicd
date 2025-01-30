import { Inject, Injectable } from '@nestjs/common';

import { CustomerRepository } from '../domain/customer.repository';
import { SearchCustomerCondition } from '../domain/search/search-customer-condition.dto';
import { Customer } from '../domain';
import { SaveCustomer } from '../domain/save';
import { Transactional } from 'src/common/app/transactional.decorator';
import { PersistentManager } from 'src/common/app/persistent-manager';

/**
 * 顧客アプリケーションサービス
 */
@Injectable()
export class CustomerService {
  constructor(
    private readonly pm: PersistentManager,
    @Inject('CustomerRepository')
    private readonly repository: CustomerRepository,
  ) {}

  /**
   * 顧客取得
   *
   * @param id 顧客ID
   * @returns 顧客
   */
  async get(id: number): Promise<Customer> {
    return this.repository.get(this.pm, id);
  }

  /**
   * 顧客検索
   *
   * @param condition 顧客検索条件
   * @returns 顧客リスト
   */
  async list(condition: SearchCustomerCondition): Promise<Customer[]> {
    return this.repository.search(this.pm, condition);
  }

  /**
   * 顧客登録
   *
   * @param customer 登録する顧客
   * @returns 顧客
   */
  async save(customer: SaveCustomer): Promise<Customer> {
    customer.refineNewly;
    return this.pm.$transaction(async (tx: PersistentManager) => {
      return this.repository.save(tx, customer);
    });
  }

  /**
   * 顧客更新
   *
   * @param id 顧客ID
   * @param customer 更新する顧客
   * @returns 顧客
   */
  async update(id: number, customer: SaveCustomer): Promise<Customer> {
    return this.pm.$transaction(async (tx: PersistentManager) => {
      return this.repository.save(tx, customer);
    });
  }

  /**
   * 顧客削除
   *
   * @param id 顧客ID
   */
  async delete(id: number) {
    return this.pm.$transaction(async (tx: PersistentManager) => {
      return this.repository.delete(tx, id);
    });
  }
}
