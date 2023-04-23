import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  const documentConfig = new DocumentBuilder()
      .setTitle('게시판 프로젝트')
      .setDescription('Swagger description')
      .setVersion('0.0.1')
      .build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('api', app, document);

  const serverConfig = config.get('server');
  const port = serverConfig.port;

  await app.listen(port);
  logger.log(`Application running on port ${port}`);
}
bootstrap();
