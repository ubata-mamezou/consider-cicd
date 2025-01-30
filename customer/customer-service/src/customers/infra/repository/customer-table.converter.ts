import { Injectable } from '@nestjs/common';
import { Customer as CustomerTable, Prisma } from '@prisma/client';
import { Customer, CustomerRankUtils } from '../../domain';
import { SaveCustomer } from '../../domain/save';

@Injectable()
export class CustomerTableConverter {
  toEntity = (source: CustomerTable): Customer => {
    return source === null
      ? null
      : new Customer(
          source.id,
          source.version,
          CustomerRankUtils.from(source.rank),
          source.name,
          source.address,
          source.createAt,
          source.updateAt,
        );
  };

  toEntities = (source: CustomerTable[]): Customer[] => {
    return source === null ? null : source.map(this.toEntity);
  };

  fromCreateDtoBySaveCustomer = (source: SaveCustomer): Prisma.CustomerCreateInput => {
    return source === null
      ? null
      : {
          version: source._version,
          rank: source._rank,
          name: source._name,
          address: source._address,
          createAt: new Date(),
          updateAt: new Date()
        };
  };

  private fromUpdateDtoByCustomer = (source: Customer): Prisma.CustomerUpdateInput => {
    return source === null
      ? null
      : {
          version: source._version,
          rank: source._rank,
          name: source._name,
          address: source._address,
          createAt: source._createAt,
          updateAt: source._updateAt
        };
  };

  fromUpdateDtoBySaveCustomer = (current: Customer, source: SaveCustomer): Prisma.CustomerUpdateInput => {
    let dto = this.fromUpdateDtoByCustomer(current);
    return source === null
      ? null
      : {
          ...dto,
          version: source._version,
          rank: source._rank,
          name: source._name,
          address: source._address,
        };
  };
}
