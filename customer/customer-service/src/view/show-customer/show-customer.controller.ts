import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { CustomerService } from '@service/customers/app/customer.service';

@Controller('show-customer')
export class ShowCustomerController {
  constructor(private readonly service: CustomerService) {}

  /**
   * 初期表示
   *
   * @param id 顧客ID
   * @returns 顧客
   */
  @Get(':id')
  init(@Param('id', ParseIntPipe) id: number) {
    return this.service.get(id);
  }
}
