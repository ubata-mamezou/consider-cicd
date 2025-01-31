import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AccessLogInterceptor } from './common/adapter/interceptors/access-log.interceptor';
import { GlobalExceptionsFilter } from './common/adapter/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();//CORS許可
  // app.setGlobalPrefix('view'); //API全体へのPrefix設定
  app.useGlobalInterceptors(new AccessLogInterceptor());
  app.useGlobalFilters(new GlobalExceptionsFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
