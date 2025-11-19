import { ErrorMessage } from './error-message.dto';

/**
 * カスタムエラー
 */
export class CustomError extends Error {
  constructor(
    readonly message: string,
    readonly details?: ErrorMessage[],
    readonly cause?: unknown,
  ) {
    super(message);
    this.cause = cause;
    this.details = details;
  }

  /**
   * 詳細を取得する(JSON)
   * <p>
   * 詳細が設定されてない場合はブランクを返却する
   */
  get detailsAsJson() {
    return this.details !== undefined ? JSON.stringify(this.details) : '';
  }

  /**
   * 原因を取得する(JSON)
   * <p>
   * 原因が設定されてない場合はブランクを返却する
   */
  get causeAsJson() {
    return this.cause !== undefined
      ? JSON.stringify(this.cause)
      : '';
  }
}
