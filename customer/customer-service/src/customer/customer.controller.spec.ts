import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { AppConfig } from '../AppConfig';
import { ConfigService } from '@nestjs/config';

describe('CustomerController', () => {
  let controller: CustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [AppConfig, ConfigService, CustomerService],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
