// src/interceptors/transaction.interceptor.ts

import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PersistentManager } from 'src/common/app/persistent-manager';

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  constructor(private readonly prisma: PersistentManager) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    return next.handle().pipe(
      tap(async () => {
        // await PersistentManager.getPrisma().run(this.prisma, async () => { 
        //   // AsyncLocalStorage に PrismaService のインスタンスを格納
        //   await this.prisma.$transaction(async (tx) => {
        //     // トランザクション処理は Service や Repository で行う
        //   });
        // });
      }),
    );
  }
}