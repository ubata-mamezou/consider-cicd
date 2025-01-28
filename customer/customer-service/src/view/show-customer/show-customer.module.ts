import { Module } from '@nestjs/common';


import { CustomerService } from '@service/customers/index';
import { CustomerModelConverter } from '@view/customer-model.converter';
import { ShowCustomerController } from './show-customer.controller';

@Module({
  imports: [CustomerModelConverter, CustomerService],
  controllers: [ShowCustomerController],
})
export class ShowCustomerModule {}
