import { Module } from '@nestjs/common';
import { DeleteCustomerController } from '@view/delete-customer';

/**
 * 顧客削除モジュール
 */
@Module({
  controllers: [DeleteCustomerController]
})
export class DeleteCustomerModule {}