import { Injectable, NotFoundException } from '@nestjs/common';
import { PersistentManager } from 'src/common/app/persistent-manager';
import { Customer } from '../../domain/customer.entity';
import { CustomerRepository } from '../../domain/customer.repository';
import { CustomerTableConverter } from './customer-table.converter';
import { SearchCustomerCondition } from '../../domain/search';
import { SaveCustomer } from '../../domain/save';
import { ApplicationError } from 'src/common/infra/errors/application.error';
import { CustomerHistoryTableConverter } from './customer-history-table.converter';
import { BusinessError } from 'src/common/infra/errors/business.error';
import { log } from 'console';

/**
 * 顧客リポジトリ実装
 */
@Injectable()
export class CustomerRepositoryImpl implements CustomerRepository {
  constructor(
    private readonly converter: CustomerTableConverter,
    private readonly historyConverter: CustomerHistoryTableConverter,
  ) {}

  async get(pm: PersistentManager, id: number): Promise<Customer> {
    const data = await pm.customer.findUnique({ where: { id } });
    if (data !== null) {
      return this.converter.toEntity(data);
    }
    throw new NotFoundException();
  }

  async search(
    pm: PersistentManager,
    condition: SearchCustomerCondition,
  ): Promise<Customer[]> {
    //動的な抽出条件構築
    const where: any = {};
    if (condition._rank) where.rank = condition._rank;

    //動的な並び替え条件構築
    const orderBy: any = {};

    return this.converter.toEntities(
      await pm.customer.findMany({
        where,
        orderBy,
        skip: (condition._page - 1) * condition._limit,
        take: Math.min(condition._limit, condition._maximumRecords),
      }),
    );
  }

  async save(pm: PersistentManager, customer: SaveCustomer): Promise<Customer> {
    if (customer.isNew()) {
      // 新規登録
      try {
        return this.converter.toEntity(
          await pm.customer.create({
            data: this.converter.fromCreateDtoBySaveCustomer(customer),
          }),
        );
      } catch (e) {
        console.log(JSON.stringify(e));
        throw new ApplicationError('create failed', null, e);
      }
    } else {
      try {
        // 更新
        const current = await this.get(pm, customer._id);
        if (current._version !== customer._version) {
          throw new BusinessError(
            `optimistic error [ID]${customer._id} [version]${customer._version} [current version]${current._version}`,
          );
        }
        await pm.customerHistory.create({
          data: this.historyConverter.fromCustomer(current),
        });
        return this.converter.toEntity(
          await pm.customer.update({
            where: {
              id: customer._id,
            },
            data: {
              ...this.converter.fromUpdateDtoBySaveCustomer(current, customer),
              version: { increment: 1 },
            },
          }),
        );
      } catch (e) {
        console.log(JSON.stringify(e));
        throw new ApplicationError(
          `update failed [ID]${customer._id}`,
          null,
          e,
        );
      }
    }
  }

  async delete(pm: PersistentManager, id: number) {
    try {
      return await pm.customer.delete({ where: { id } });
    } catch (e) {
      throw new ApplicationError(`deletion failed [ID]${id}`);
    }
  }
}
