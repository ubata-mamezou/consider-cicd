import { Module } from '@nestjs/common';
import { EditCustomerController } from './edit-customer.controller';
import { CustomerService } from '@service/customers/index';

@Module({
  imports: [CustomerService],
  controllers: [EditCustomerController]
})
export class EditCustomerModule {}
