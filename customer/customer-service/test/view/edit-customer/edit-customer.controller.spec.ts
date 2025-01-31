import { Test, TestingModule } from '@nestjs/testing';

import { EditCustomerController } from '@view/edit-customer';

describe('EditCustomerController', () => {
  let controller: EditCustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EditCustomerController],
    }).compile();

    controller = module.get<EditCustomerController>(EditCustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
