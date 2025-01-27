import { CustomerRank } from './customer-rank.vo';

/**
 * Customer
 */
export class Customer {
  constructor(
    private id: number | null,
    private version: number,
    private rank: CustomerRank,
    private name: string,
    private address: string,
  ) {
    this.id = id;
    this.version= version;
    this.rank = rank;
    this.name = name;
    this.address = address;
  }

  get _id(): number {
    return this.id;
  }

  isNew() {
    return this.id === null ? true : false;
  }

  get _rank(): CustomerRank {
    return this.rank;
  }
}
