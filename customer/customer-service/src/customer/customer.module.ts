import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { AppConfig } from '../AppConfig';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, AppConfig, ConfigService],
})
export class CustomerModule {}
