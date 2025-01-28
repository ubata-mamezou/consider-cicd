/**
 * 顧客ランク。
 */
export type CustomerRank = 'A' | 'B' | 'C';

/**
 * 顧客ランクユーティリティ。
 */
export const CustomerRankUtils = {
  isValid(value: string): boolean {
    return value === 'A' || value === 'B' || value === 'C';
  },
  from(value: string): CustomerRank | undefined {
    if (CustomerRankUtils.isValid(value)) {
      return value as CustomerRank;
    }
    return undefined;
  }
};
