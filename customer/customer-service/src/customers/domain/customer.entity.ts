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
  ) {}

  get _id() {
    return this.id;
  }

  get _version() {
    return this.version;
  }

  get _rank() {
    return this.rank;
  }

  get _name() {
    return this.name;
  }

  get _address() {
    return this.address;
  }
}
