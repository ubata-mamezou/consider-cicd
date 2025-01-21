import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { CustomerService } from 'src/customers/customer.service';

@Controller('show-customer')
export class ShowCustomerController {
  constructor(private readonly service: CustomerService) {}

  @Get('/:id')
  initialize(@Param('id', ParseIntPipe) id: number) {
    return this.service.get(id);
  }
}
