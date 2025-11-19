import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CustomerService } from '@service/customers/app/customer.service';
import { CustomerModelConverter } from '@view/customer-model.converter';
import { CreateCustomerReq } from 'src/models/create-customer-req';

@Controller('create-customer')
export class CreateCustomerController {
  constructor(
    private readonly converter: CustomerModelConverter,
    private readonly service: CustomerService,
  ) {}

  /**
   * 顧客登録。
   *
   * @param req 登録する顧客
   * @returns 顧客
   */
  @Post()
  @HttpCode(200)
  async create(@Body() req: CreateCustomerReq) {
    return this.service.save(this.converter.toSaveCustomerWhenInit(req));
  }
}
