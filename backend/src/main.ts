import { NestFactory } from '@nestjs/core';
import { AppModule } from './core/app.module';
import { configs } from './core/configs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(configs.APP_PORT);
}
bootstrap();
