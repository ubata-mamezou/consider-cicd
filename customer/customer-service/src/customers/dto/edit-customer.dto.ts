import { CustomerRank } from '../domain/customer-rank.vo';

/**
 * Edit Customer
 */
export class EditCustomer {
  constructor(
    private id: number,
    private rank: CustomerRank,
    private name: string,
    private address: string,
  ) {
    this.id = id;
    this.rank = rank;
    this.name = name;
    this.address = address;
  }

  get _id(): number {
    return this.id;
  }

  get _rank(): CustomerRank {
    return this.rank;
  }
}
