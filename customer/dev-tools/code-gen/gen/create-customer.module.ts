import { Module } from '@nestjs/common';
import { Controller } from './create-customer.controller';

/**
 * 顧客登録モジュール
 */
@Module({
  controllers: [Controller]
})
export class Module {}