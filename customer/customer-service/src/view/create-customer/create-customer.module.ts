import { Module } from '@nestjs/common';
import { CreateCustomerController } from './create-customer.controller';

@Module({
  controllers: [CreateCustomerController]
})
export class CreateCustomerModule {}
