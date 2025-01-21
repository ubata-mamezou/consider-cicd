import { Module } from '@nestjs/common';

import { CustomerModule } from 'src/customers/customer.module';

import { ShowCustomerController } from './show-customer.controller';

@Module({
  imports: [CustomerModule],
  controllers: [ShowCustomerController],
})
export class ShowCustomerModule {}
