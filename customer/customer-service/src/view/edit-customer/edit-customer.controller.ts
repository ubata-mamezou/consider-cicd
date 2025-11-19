import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Headers
} from '@nestjs/common';
import { CustomerService } from '@service/customers/app/customer.service';
import { CustomerModelConverter } from '@view/customer-model.converter';
import { CreateCustomerReq } from 'src/models/create-customer-req';

@Controller('edit-customer')
export class EditCustomerController {
  constructor(
    private readonly converter: CustomerModelConverter,
    private readonly service: CustomerService,
  ) {}

  /**
   * 初期表示。
   *
   * @param id 顧客ID
   * @returns 顧客
   */
  @Get('/:id')
  async init(@Param('id', ParseIntPipe) id: number) {
    return this.service.get(id);
  }

  /**
   * 顧客更新
   *
   * @param id 顧客ID
   * @param req 更新する顧客
   * @returns 顧客
   */
  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Headers('version') version: number,
    @Body() req: CreateCustomerReq,
  ) {
    return this.service.update(id, this.converter.toSaveCustomer(id, Number(version), req));
  }
}
