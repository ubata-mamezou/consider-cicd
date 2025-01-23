import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RouterModule } from '@nestjs/core';
import { CreateCustomerModule } from '@view/create-customer';
import { EditCustomerModule } from '@view/edit-customer';
import { SearchCustomerModule } from '@view/search-customer';
import { ShowCustomerModule } from '@view/show-customer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfig } from './AppConfig';
import { CustomerModule } from './customer/customer.module';

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
    CreateCustomerModule,
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
