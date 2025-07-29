import * as dayjs from 'dayjs';

/**
 * 日付ユーティリティ
 */
export class DateUtil {
  private static readonly DATETIME_FORMAT_PATTERN = 'YYYY-MM-DD HH:mm:ss.SSS';

  /**
   * 編集済みの現在日時を取得する
   *
   * @returns 編集済みの現在日時
   */
  static formatDateTimeWhenNow(): string {
    return this.formatDateTime(new Date());
  }

  /**
   * 編集済みの日時を取得する
   *
   * @param source 編集対象の日時
   * @returns 編集済みの日時
   */
  static formatDateTime(source: Date): string {
    return dayjs(source).format(this.DATETIME_FORMAT_PATTERN);
  }
}
