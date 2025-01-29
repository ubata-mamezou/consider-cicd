import { Module } from '@nestjs/common';
import { CustomerModule } from '@service/customers/index';
import { DeleteCustomerController } from './delete-customer.controller';

/**
 * 顧客削除モジュール
 */
@Module({
  imports: [CustomerModule],
  controllers: [DeleteCustomerController],
})
export class DeleteCustomerModule {}