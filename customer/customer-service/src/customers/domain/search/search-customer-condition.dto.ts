import { CustomerRank } from '../customer-rank.vo';

/**
 * 顧客検索条件。
 */
export class SearchCustomerCondition {
  private static DEFAULT_PAGE = 1;
  private static DEFAULT_LIMIT = 100;
  private static DEFAULT_MAXIMUM_RECORDS = 1000;

  constructor(
    private readonly page: number,
    private readonly limit: number,
    private readonly maximumRecords: number,
    private readonly rank: CustomerRank | null,
    ) {
    this.page = page !== null ? page : SearchCustomerCondition.DEFAULT_PAGE;
    this.limit = limit !== null ? limit : SearchCustomerCondition.DEFAULT_LIMIT;
    this.maximumRecords =
      maximumRecords !== null
        ? maximumRecords
        : SearchCustomerCondition.DEFAULT_MAXIMUM_RECORDS;
    this.rank = rank;
  }

  get _page() {
    return this.page;
  }
  get _limit() {
    return this.limit;
  }
  get _maximumRecords() {
    return this.maximumRecords;
  }
  get _rank() {
    return this.rank;
  }
}
