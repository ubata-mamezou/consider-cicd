import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { CustomerService } from 'src/customers/customer.service';
import { SearchCustomerCondition } from 'src/customers/dto/search-customer-condition.dto';

/**
 * 顧客検索画面用コントローラー。
 */
@Controller('search-customer')
export class SearchCustomerController {
  constructor(private readonly service: CustomerService) {}

  /**
   * 顧客検索。
   * 
   * @param condition 検索条件
   * @returns 顧客リスト
   */
  @Post('/search')
  @HttpCode(200)
  search(@Body('condition') condition: SearchCustomerCondition) {
    return this.service.list(condition);
  }
}
