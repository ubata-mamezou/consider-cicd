import { Controller, HttpCode, Post } from '@nestjs/common';
import { CustomerService } from '@service/customers/customer.service';
import { to } from '@view/customer.converter';
import { CreateCustomerReq } from 'src/models/create-customer-req';

@Controller('create-customer')
export class CreateCustomerController {

  constructor(private readonly service: CustomerService) {}

  /**
   * 顧客登録。
   *
   * @returns 顧客
   */
  @Post()
  // @HttpCode(201)
  create(req: CreateCustomerReq) {
    return this.service.save(to(req));
  }
}
