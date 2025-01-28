import { CustomerRank } from '../customer-rank.vo';

/**
 * Save Customer
 */
export class SaveCustomer {
  constructor(
    private id: number | null,
    private version: number,
    private rank: CustomerRank,
    private name: string,
    private address: string,
  ) {}

  isNew() {
    return this.id === null ? true : false;
  }

  refineNewly() {
    this.id = null;
    this.version = 0;
  }

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
