import { Controller, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CustomerService } from '@service/customers/index';

/**
 * 顧客削除コントローラー
 */
@Controller('delete-customer')
export class DeleteCustomerController {

  constructor(private readonly service: CustomerService) {
    console.log('CustomerService:', service);
  }

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
   * 削除
   * 
   * @param id 顧客ID
   */
  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    this.service.delete(id);
  }
}