import { Module } from '@nestjs/common';
import { CustomerModule } from '@service/customers/index';
import { ViewCommonModule } from '@view/view-common.module';
import { CreateCustomerController } from './create-customer.controller';

@Module({
  imports: [ViewCommonModule, CustomerModule],
  controllers: [CreateCustomerController]
})
export class CreateCustomerModule {}
