import { Test, TestingModule } from '@nestjs/testing';
import { DeleteCustomerController } from '@view/delete-customer';

/**
 * 顧客削除コントローラーテスト
 */
describe('DeleteCustomerController', () => {
  let controller: DeleteCustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteCustomerController],
    }).compile();

    controller = module.get<DeleteCustomerController>(DeleteCustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
