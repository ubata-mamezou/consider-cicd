import { Module } from '@nestjs/common';

import { PersistentManager } from 'src/common/service/persistent-manager';
import { CustomerService } from './app/customer.service';
import { CustomerRepositoryImpl } from './infra/customer.repository-impl';

@Module({
  providers: [
    CustomerService,
    PersistentManager,
    { provide: 'CustomerRepository', useClass: CustomerRepositoryImpl },
  ],

  exports: [CustomerService],
})
export class CustomerModule {}
