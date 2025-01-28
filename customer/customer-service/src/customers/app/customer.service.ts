import { Injectable } from '@nestjs/common';

import { CustomerRepository } from '../domain/customer.repository';
import { SearchCustomerCondition } from '../domain/search/search-customer-condition.dto';
import { Customer } from '../domain';
import { SaveCustomer } from '../domain/save';

/**
 * 顧客アプリケーションサービス
 */
@Injectable()
export class CustomerService {
  constructor(private readonly repository: CustomerRepository) {}

  /**
   * 顧客取得
   *
   * @param id 顧客ID
   * @returns 顧客
   */
  async get(id: number): Promise<Customer> {
    return this.repository.get(id);
  }

  /**
   * 顧客検索
   *
   * @param condition 顧客検索条件
   * @returns 顧客リスト
   */
  async list(condition: SearchCustomerCondition): Promise<Customer[]> {
    return this.repository.search(condition);
  }

  /**
   * 顧客登録
   * 
   * @param customer 登録する顧客
   * @returns 顧客
   */
  async save(customer: SaveCustomer): Promise<Customer> {
    customer.refineNewly;
    return this.repository.save(customer);
  }

  /**
   * 顧客更新
   * 
   * @param id 顧客ID
   * @param customer 更新する顧客
   * @returns 顧客
   */
  async update(id:number, customer: SaveCustomer): Promise<Customer> {
    return this.repository.save(customer);
  }

  /**
   * 顧客削除
   * 
   * @param id 顧客ID
   */
  async delete(id:number) {
    this.repository.delete(id);
  }

  // async optimisticUpdate(id: number, version: number, data: Prisma.CustomerUpdateInput): Promise<Customer> {
  //   return this.pm.customer.update({
  //     where: { id },
  //     data: {
  //       ...data,
  //       version: { increment: 1 },
  //     },
  //     where: {
  //       id_version: {
  //         id,
  //         version,
  //       },
  //     },
  //   });
  // }

  // async pessimisticLock(id: number): Promise<Customer> {
  //   return this.pm.$transaction(async (prisma) => {
  //     // Prisma では `FOR UPDATE` のような明示的なロックは未サポート
  //     const user = await prisma.customer.findUnique({ where: { id } });
  //     if (!user) throw new Error('User not found');
  //     return user;
  //   });
  // }
}
