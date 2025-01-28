import { Injectable } from '@nestjs/common';
import { PersistentManager } from 'src/common/service/persistent-manager';
import { Customer } from '../domain/customer.entity';
import { CustomerRepository } from '../domain/customer.repository';
import { CustomerTableConverter } from './customer-table.converter';
import { SearchCustomerCondition } from '../domain/search';
import { SaveCustomer } from '../domain/save';

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
    return this.converter.toEntity(
      await this.pm.customer.findUnique({ where: { id } }),
    );
  }

  async search(condition: SearchCustomerCondition): Promise<Customer[]> {
    return this.converter.toEntities(await this.pm.customer.findMany());
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
