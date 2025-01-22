import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfig } from './AppConfig';
import { CustomerModule } from './customer/customer.module';
import { SearchCustomerModule } from './view/search-customer/search-customer.module';
import { ShowCustomerModule } from '@view/show-customer/show-customer.module';
import { EditCustomerModule } from './view/edit-customer/edit-customer.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
      isGlobal: true,
    }),
    CustomerModule,
    ShowCustomerModule,
    SearchCustomerModule,
    EditCustomerModule,
    RouterModule.register([
      {
        path: 'view',
        module: ShowCustomerModule,
      },
      {
        path: 'view',
        module: SearchCustomerModule,
      },
      {
        path: 'view',
        module: EditCustomerModule,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, AppConfig],
})
export class AppModule {}
