import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { AppConfig } from './AppConfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
      isGlobal: true,
    }),
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppConfig],
})
export class AppModule {}
