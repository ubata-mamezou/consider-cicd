import { Injectable } from '@nestjs/common';
import { Customer as CustomerTable, Prisma } from '@prisma/client';
import { Customer, CustomerRankUtils } from '../domain';
import { SaveCustomer } from '../domain/save';

@Injectable()
export class CustomerTableConverter {
  toEntity = (source: CustomerTable): Customer => {
    return new Customer(
      source.id,
      source.version,
      CustomerRankUtils.from(source.rank),
      source.name,
      source.address,
    );
  };

  toEntities = (source: CustomerTable[]): Customer[] => {
    return source.map(this.toEntity);
  };

  fromCreateDto = (source: SaveCustomer): Prisma.CustomerCreateInput => {
    return {
      version: 0,
      rank: source._rank,
      name: source._name,
      address: source._address,
    };
  };

  fromUpdateDto = (source: SaveCustomer): Prisma.CustomerUpdateInput => {
    return {
      version: source._version,
      rank: source._rank,
      name: source._name,
      address: source._address,
    };
  };
}
