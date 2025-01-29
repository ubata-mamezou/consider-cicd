import { Injectable, NotFoundException } from '@nestjs/common';
import { PersistentManager } from 'src/common/app/persistent-manager';
import { Customer } from '../../domain/customer.entity';
import { CustomerRepository } from '../../domain/customer.repository';
import { CustomerTableConverter } from './customer-table.converter';
import { SearchCustomerCondition } from '../../domain/search';
import { SaveCustomer } from '../../domain/save';

/**
 * 顧客リポジトリ実装
 */
@Injectable()
export class CustomerRepositoryImpl implements CustomerRepository {
  constructor(
    private readonly pm: PersistentManager,
    private readonly converter: CustomerTableConverter,
  ) {}

  async get(id: number): Promise<Customer> {
    const data = await this.pm.customer.findUnique({ where: { id } });
    if (data !== null) {
      return this.converter.toEntity(data);
    }
    throw new NotFoundException();
  }

  async search(condition: SearchCustomerCondition): Promise<Customer[]> {
    //動的な抽出条件構築
    const where: any = {};
    if (condition._rank) where.rank = condition._rank;

    //動的な並び替え条件構築
    const orderBy: any ={};

    return this.converter.toEntities(
      await this.pm.customer.findMany({
        where,
        orderBy,
        skip: (condition._page - 1) * condition._limit,
        take: Math.min(condition._limit, condition._maximumRecords),
      }),
    );
  }

  async save(customer: SaveCustomer): Promise<Customer> {
    if (customer.isNew()) {
      return this.converter.toEntity(
        await this.pm.customer.create({
          data: this.converter.fromCreateDto(customer),
        }),
      );
    }
    return this.converter.toEntity(
      await this.pm.customer.update({
        where: { id: customer._id },
        data: this.converter.fromUpdateDto(customer),
      }),
    );
  }

  async delete(id: number) {
    this.pm.customer.delete({ where: { id } });
  }
}
