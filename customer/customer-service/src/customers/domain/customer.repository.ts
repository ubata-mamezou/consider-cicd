import { PersistentManager } from "src/common/app/persistent-manager";
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
   * @param pm 永続化マネージャー
   * @param id 顧客ID
   * @returns 顧客
   */
  get(pm: PersistentManager, id: number): Promise<Customer>;

  /**
   * 顧客検索
   * 
   * @param pm 永続化マネージャー
   * @param condition 検索条件
   * @returns 顧客リスト
   */
  search(pm: PersistentManager, condition: SearchCustomerCondition): Promise<Customer[]>;

  /**
   * 顧客登録
   * <p>
   * IDが設定されている場合は更新。
   * 
   * @param pm 永続化マネージャー
   * @param customer 登録対象の顧客
   * @returns 顧客
   */
  save(pm: PersistentManager, customer: SaveCustomer): Promise<Customer>;

  /**
   * 顧客削除
   * 
   * @param pm 永続化マネージャー
   * @param id 顧客ID
   */
  delete(pm: PersistentManager, id: number);

}