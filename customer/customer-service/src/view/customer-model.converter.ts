import { SaveCustomer } from '@service/customers/domain/save';
import { CreateCustomerReq } from 'src/models/create-customer-req';
import { CustomerRank, CustomerRankUtils } from '../customers';
import { Injectable } from '@nestjs/common';
import { SearchCustomerCondition as SearchCustomerConditionModel } from 'src/models/search-customer-condition';
import { SearchCustomerCondition } from '@service/customers/domain/search';

@Injectable()
export class CustomerModelConverter {
  toSearchCustomerCondition = (source: SearchCustomerConditionModel) => {
    return new SearchCustomerCondition(source.rank as CustomerRank);
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
