import { Module } from '@nestjs/common';


import { CustomerService } from '@service/customers/index';
import { CustomerModelConverter } from '@view/customer-model.converter';
import { SearchCustomerController } from './search-customer.controller';

@Module({
  imports: [CustomerModelConverter, CustomerService],
  controllers: [SearchCustomerController],
})
export class SearchCustomerModule {}
