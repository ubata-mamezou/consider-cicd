import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AccessLogInterceptor } from './common/infra/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();//CORS許可
  // app.setGlobalPrefix('view'); //API全体へのPrefix設定
  app.useGlobalInterceptors(new AccessLogInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
