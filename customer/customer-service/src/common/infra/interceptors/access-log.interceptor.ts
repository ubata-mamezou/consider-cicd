import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DateUtil } from '../utils/date.util';

/**
 * アクセスログインターセプター
 */
@Injectable()
export class AccessLogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startAt = Date.now();
    const controllerName = context.getClass().name;
    const methodName = context.getHandler().name;
    const request = context.switchToHttp().getRequest();
    const { method, originalUrl, query, body } = request;

    let startLog = '';
    startLog += DateUtil.formatDateTimeWhenNow();
    startLog += ` ${controllerName}#${methodName}`;
    startLog += ` [URL]${method}: ${originalUrl}`;
    startLog += ` [query]${JSON.stringify(query)}`;
    startLog += ` [request]${JSON.stringify(body)}`;
    startLog += ' #accessLog';
    console.log(startLog);

    return next.handle().pipe(
      tap((data) => {
        let finishLog = '';
        finishLog += DateUtil.formatDateTimeWhenNow();
        finishLog += ` ${controllerName}#${methodName}`;
        finishLog += ` [processing-time]${Date.now() - startAt}ms`;
        finishLog += ` [response]${JSON.stringify(data)}`;
        finishLog += ' #accessLog';
        console.log(finishLog);
      }),
    );
  }
}
