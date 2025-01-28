import { Module } from '@nestjs/common';
import { EditCustomerController } from './edit-customer.controller';
import { CustomerService } from '@service/customers/index';
import { CustomerModelConverter } from '@view/customer-model.converter';

@Module({
  imports: [CustomerModelConverter, CustomerService],
  controllers: [EditCustomerController]
})
export class EditCustomerModule {}
