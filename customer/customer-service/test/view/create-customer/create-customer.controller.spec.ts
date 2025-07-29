import { Test, TestingModule } from '@nestjs/testing';
import { CreateCustomerController } from '@view/create-customer';

describe('CreateCustomerController', () => {
  let controller: CreateCustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateCustomerController],
    }).compile();

    controller = module.get<CreateCustomerController>(CreateCustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
