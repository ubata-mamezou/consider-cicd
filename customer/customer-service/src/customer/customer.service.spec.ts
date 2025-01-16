import { Test, TestingModule } from '@nestjs/testing';

import { Customer } from './customer';
import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerService],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get', () => {
    it('should return the customer by id', () => {
      const customer = service.get(1);
      expect(customer).toEqual({ id: 1, name: 'suzuki' });
    });

    it('should return undefined if customer does not exist', () => {
      const customer = service.get(999);
      expect(customer).toBeUndefined();
    });
  });

  describe('save', () => {
    it('should save a new customer with a new ID', () => {
      const newCustomer: Customer = { id: null, name: 'tanaka' };
      service.save(newCustomer);

      const savedCustomer = service.get(4); // 新しいID
      expect(savedCustomer).toEqual({ id: 4, name: 'tanaka' });
    });

    it('should update an existing customer', () => {
      const updatedCustomer: Customer = { id: 2, name: 'yamada' };
      service.save(updatedCustomer);

      const customer = service.get(2);
      expect(customer).toEqual({ id: 2, name: 'yamada' });
    });
  });

  describe('delete', () => {
    it('should delete a customer by id', () => {
      service.delete(3);
      const customer = service.get(3);

      expect(customer).toBeUndefined();
    });

    it('should do nothing if the customer does not exist', () => {
      service.delete(999);
      expect(service.get(999)).toBeUndefined();
    });
  });
});
