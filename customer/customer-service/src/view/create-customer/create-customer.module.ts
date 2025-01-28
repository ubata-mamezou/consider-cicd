import { Module } from '@nestjs/common';
import { CreateCustomerController } from './create-customer.controller';
import { CustomerModelConverter } from '@view/customer-model.converter';
import { CustomerService } from '@service/customers/index';

@Module({
  imports: [CustomerModelConverter, CustomerService],
  controllers: [CreateCustomerController]
})
export class CreateCustomerModule {}
