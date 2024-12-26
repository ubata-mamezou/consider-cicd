import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  /**
   * @param appService - The service used to handle application logic
   */
  constructor(private readonly appService: AppService) {}

  @Get()
  /**
   * Returns a greeting message.
   * @returns {string} A greeting message.
   */
  getHello(): string {
    return this.appService.getHello();
  }
}
