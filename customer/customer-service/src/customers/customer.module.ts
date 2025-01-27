import { Module } from '@nestjs/common';

import { CustomerService } from './customer.service';
import { PersistentManager } from 'src/common/service/persistent-manager';

@Module({
  providers: [CustomerService, PersistentManager],
  exports: [CustomerService],
})
export class CustomerModule {}
