import { Module } from '@nestjs/common';
import { CustomerModule } from '@service/customers/index';
import { ViewCommonModule } from '@view/view-common.module';
import { EditCustomerController } from './edit-customer.controller';

@Module({
  imports: [ViewCommonModule, CustomerModule],
  controllers: [EditCustomerController]
})
export class EditCustomerModule {}
