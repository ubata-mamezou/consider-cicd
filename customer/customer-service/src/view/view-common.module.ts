import { Module } from '@nestjs/common';
import { CustomerModelConverter } from './customer-model.converter';



@Module({
  providers: [CustomerModelConverter],
  exports: [CustomerModelConverter]
})
export class ViewCommonModule {}
