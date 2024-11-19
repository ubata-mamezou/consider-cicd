import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { AppConfig } from 'src/AppConfig';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, AppConfig],
})
export class CustomerModule {}
