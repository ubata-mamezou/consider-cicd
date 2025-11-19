import { Test, TestingModule } from '@nestjs/testing';

import { SearchCustomerController } from '@view/search-customer';

describe('SearchCustomerController', () => {
  let controller: SearchCustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchCustomerController],
    }).compile();

    controller = module.get<SearchCustomerController>(SearchCustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
