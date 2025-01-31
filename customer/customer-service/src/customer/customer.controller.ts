import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Customer } from './customer';
import { CustomerService } from './customer.service';
import { AppConfig } from '../AppConfig';

/**
 * 顧客コントローラー
 */
@Controller('customers')
export class CustomerController {
  constructor(
    private readonly configService: ConfigService,
    private readonly appConfig: AppConfig,
    private readonly customerService: CustomerService,
  ) {}

  @Get()
  get(id: number): Customer {
    console.log(
      `
       env: ${this.configService.get<string>('ENV_NAME', '読めてない')}
       env(from manager): ${this.appConfig.envName}
      `,
    );
    return this.customerService.get(id);
  }
}
