import { CustomerRank } from '../customer-rank.vo';

/**
 * 顧客検索条件。
 */
export class SearchCustomerCondition {
  constructor(private rank: CustomerRank) {}
  get _rank() {
    return this.rank;
  }
}
