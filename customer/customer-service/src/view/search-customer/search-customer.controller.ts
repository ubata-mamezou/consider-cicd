import { Body, Controller, Post } from '@nestjs/common';

import { CustomerService } from 'src/customers/customer.service';
import { SearchCustomerCondition } from 'src/customers/dto/search-customer-condition.dto';

/**
 * 顧客検索画面用コントローラー。
 */
@Controller('search-customer')
export class SearchCustomerController {
  constructor(private readonly service: CustomerService) {}

  @Post('/search')
  search(@Body('condition') condition: SearchCustomerCondition) {
    return this.service.list(condition);
  }
}
