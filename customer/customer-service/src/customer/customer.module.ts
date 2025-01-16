import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { AppConfig } from '../AppConfig';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, AppConfig, ConfigService],
})
export class CustomerModule {}
