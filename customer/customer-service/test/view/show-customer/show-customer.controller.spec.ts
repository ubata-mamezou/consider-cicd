import { Test, TestingModule } from '@nestjs/testing';

import { ShowCustomerController } from '@view/show-customer';

describe('ShowCustomerController', () => {
  let controller: ShowCustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShowCustomerController],
    }).compile();

    controller = module.get<ShowCustomerController>(ShowCustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
