import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApplicationError } from 'src/common/infra/errors/application.error';
import { BusinessError } from 'src/common/infra/errors/business.error';
import { DateUtil } from 'src/common/infra/utils/date.util';

/**
 * グローバル例外ハンドラー
 *
 * 例外を捕捉して、エラーログ出力およびAPIのエラーをレスポンスします。
 * @example 
 * // アプリへの設定：
 * // エンドポイント（main.ts）にグローバルフィルターとして設定してください。
 * app.useGlobalFilters(new GlobalExceptionsFilter());
 */
@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let message: string;
    let messageDetails = '';
    let cause = '';
    const { method, originalUrl } = request;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
      messageDetails =exception.getResponse() as string;
      cause = typeof exception.cause !== 'undefined'? JSON.stringify(exception.cause):'';
    } else if (exception instanceof BusinessError) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
      messageDetails = exception.detailsAsJson;
      cause = exception.causeAsJson;
    } else if (exception instanceof ApplicationError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message;
      messageDetails = exception.detailsAsJson;
      cause = exception.causeAsJson;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'internal server error';
    }

    let log = '';
    log += DateUtil.formatDateTimeWhenNow();
    log += ` [path]${method}: ${originalUrl}`;
    log += ` [error-message]${JSON.stringify(message)} ${JSON.stringify(messageDetails)}`;
    log += ` [cause]${JSON.stringify(cause)}`;
    log += ' #errorLog';

    const res = {
      statusCode: status,
      timestamp: DateUtil.formatDateTimeWhenNow(),
      path: originalUrl,
      message: message,
      details: messageDetails,
      cause: cause,
    };

    console.log(log);
    response.status(status).json(res);
  }
}