import { Controller, Put } from '@nestjs/common';
import { CustomerService } from 'src/customers/customer.service';

@Controller('edit-customer')
export class EditCustomerController {
  constructor(private readonly service: CustomerService) {}

  @Put(':id')
  save() {}
}
