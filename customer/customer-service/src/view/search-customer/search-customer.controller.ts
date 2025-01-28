import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { CustomerService } from '@service/customers/app/customer.service';
import { CustomerModelConverter } from '@view/customer-model.converter';
import { SearchCustomerCondition } from 'src/models/search-customer-condition';

/**
 * 顧客検索画面用コントローラー。
 */
@Controller('search-customer')
export class SearchCustomerController {
  constructor(
    private readonly converter: CustomerModelConverter,
    private readonly service: CustomerService,
  ) {}

  /**
   * 顧客検索。
   *
   * @param condition 検索条件
   * @returns 顧客リスト
   */
  @Post('/search')
  @HttpCode(200)
  async search(@Body('condition') condition: SearchCustomerCondition) {
    return this.service.list(this.converter.toSearchCustomerCondition(condition));
  }
}
