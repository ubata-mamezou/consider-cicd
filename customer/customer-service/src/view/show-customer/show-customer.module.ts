import { Module } from '@nestjs/common';

import { CustomerModule } from '@service/customers/index';
import { ViewCommonModule } from '@view/view-common.module';
import { ShowCustomerController } from './show-customer.controller';

@Module({
  imports: [ViewCommonModule, CustomerModule],
  controllers: [ShowCustomerController],
})
export class ShowCustomerModule {}
