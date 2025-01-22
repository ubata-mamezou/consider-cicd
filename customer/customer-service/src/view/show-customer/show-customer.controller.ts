import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { CustomerService } from 'src/customers/customer.service';

@Controller('show-customer')
export class ShowCustomerController {
  constructor(private readonly service: CustomerService) {}

  /**
   * 顧客取得。
   *
   * @param id 顧客ID
   * @returns 顧客
   */
  @Get('/:id/initialize')
  initialize(@Param('id', ParseIntPipe) id: number) {
    return this.service.get(id);
  }
}
