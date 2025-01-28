import { Customer } from "./customer.entity";
import { SaveCustomer } from "./save";
import { SearchCustomerCondition } from "./search";

/**
 * 顧客リポジトリ
 */
export interface CustomerRepository {

  /**
   * 顧客取得
   * 
   * @param id 顧客ID
   * @returns 顧客
   */
  get(id: number): Promise<Customer>;

  /**
   * 顧客検索
   * 
   * @param condition 
   * @returns 顧客リスト
   */
  search(condition: SearchCustomerCondition): Promise<Customer[]>;

  /**
   * 顧客登録
   * <p>
   * IDが設定されている場合は更新。
   * 
   * @param customer 登録対象の顧客
   * @returns 顧客
   */
  save(customer: SaveCustomer): Promise<Customer>;

  /**
   * 顧客削除
   * 
   * @param id 顧客ID
   */
  delete(id: number);

}