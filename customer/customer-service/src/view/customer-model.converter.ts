import { SaveCustomer } from '@service/customers/domain/save';
import { CreateCustomerReq } from 'src/models/create-customer-req';
import { CustomerRank, CustomerRankUtils } from '../customers';
import { Injectable } from '@nestjs/common';
import { SearchCustomerCondition as SearchCustomerConditionModel } from 'src/models/search-customer-condition';
import { SearchCustomerCondition } from '@service/customers/domain/search';

@Injectable()
export class CustomerModelConverter {
  toSearchCustomerCondition = (
    page: number,
    limit: number,
    maximumRecords: number,
    condition: SearchCustomerConditionModel,
  ) => {
    return new SearchCustomerCondition(
      page,
      limit,
      maximumRecords,
      condition !== undefined ? condition.rank as CustomerRank : null,
    );
  };

  toSaveCustomerWhenInit = (source: CreateCustomerReq): SaveCustomer => {
    return this.toSaveCustomer(null, 0, source);
  };

  toSaveCustomer = (
    id: number | null,
    version: number,
    source: CreateCustomerReq,
  ) => {
    return new SaveCustomer(
      id,
      version,
      CustomerRankUtils.from(source.rank),
      source.name,
      source.address,
    );
  };
}
