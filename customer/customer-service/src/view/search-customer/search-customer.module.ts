import { Module } from '@nestjs/common';

import { CustomerModule } from 'src/customers/customer.module';

import { SearchCustomerController } from './search-customer.controller';

@Module({
  imports: [CustomerModule],
  controllers: [SearchCustomerController],
})
export class SearchCustomerModule {}
