import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000).then(() => {
    console.log(`Bryan Game Back server is running..`);
  });
}

bootstrap();
