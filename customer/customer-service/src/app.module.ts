import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfig } from './AppConfig';
import { CustomerModule } from './customer/customer.module';
import { SearchCustomerModule } from './view/search-customer/search-customer.module';
import { ShowCustomerModule } from './view/show-customer/show-customer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
      isGlobal: true,
    }),
    CustomerModule,
    ShowCustomerModule,
    SearchCustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppConfig],
})
export class AppModule {}
