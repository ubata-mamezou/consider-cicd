import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors();//CORS許可
  // app.setGlobalPrefix('view'); //API全体へのPrefix設定
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
