import { Module } from '@nestjs/common';

import { PersistentManager } from '../common/app/persistent-manager';
import { CustomerService } from './app/customer.service';
import { CustomerRepositoryImpl } from './infra/repository/customer.repository-impl';
import { CustomerTableConverter } from './infra/repository/customer-table.converter';

@Module({
  providers: [
    CustomerService,
    PersistentManager,
    { provide: 'CustomerRepository', useClass: CustomerRepositoryImpl },
    CustomerTableConverter
  ],
  exports: [CustomerService],
})
export class CustomerModule {}
