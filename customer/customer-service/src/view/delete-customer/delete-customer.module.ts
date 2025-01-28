import { Module } from '@nestjs/common';
import { CustomerService } from '@service/customers/index';
import { CustomerModelConverter } from '@view/customer-model.converter';
import { DeleteCustomerController } from '@view/delete-customer';

/**
 * 顧客削除モジュール
 */
@Module({
  imports: [CustomerModelConverter, CustomerService],
  controllers: [DeleteCustomerController]
})
export class DeleteCustomerModule {}