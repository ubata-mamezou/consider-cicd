import { Module } from '@nestjs/common';


import { SearchCustomerController } from './search-customer.controller';
import { CustomerModule } from '@service/customers/customer.module';
import { ViewCommonModule } from '@view/view-common.module';

@Module({
  imports: [ViewCommonModule, CustomerModule],
  controllers: [SearchCustomerController],
})
export class SearchCustomerModule {}
