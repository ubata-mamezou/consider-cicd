import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  Scope,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { AsyncLocalStorage } from 'async_hooks';
import { ApplicationError } from '../infra/errors/application.error';

// @Injectable({scope: Scope.REQUEST})
@Injectable()
export class PersistentManager
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private static prismaStorage = new AsyncLocalStorage<PrismaClient>();

  constructor() {
    super({
      datasources: {
        db: {
          url: 'file:./dev.db',
        },
      },
      transactionOptions: {
        maxWait: 5000,
        timeout: 10000,
      },
    });
  }

  // static getPrisma(): PrismaClient {
  //   const prisma = this.prismaStorage.getStore();
  //   if (!prisma) {
  //     throw new ApplicationError('Prisma instance not found in AsyncLocalStorage.');
  //   }
  //   return prisma;
  // }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
