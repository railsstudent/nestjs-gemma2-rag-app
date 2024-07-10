import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import { AppModule } from '~app.module';
import { validateConfig } from '~configs/validate.config';

export class Bootstrap {
  private app: NestExpressApplication;
  private configService: ConfigService;

  async initApp() {
    this.app = await NestFactory.create(AppModule);
    this.configService = this.app.get(ConfigService);
  }

  enableCors() {
    this.app.enableCors();
  }

  setupMiddleware() {
    this.app.use(express.json({ limit: '1000kb' }));
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(compression());
    this.app.use(helmet());
  }

  setupGlobalPipe() {
    this.app.useGlobalPipes(validateConfig);
  }

  async startApp() {
    const port = this.configService.get<number>('port');
    await this.app.listen(port);
    return port;
  }

  setupSwagger() {
    const config = new DocumentBuilder()
      .setTitle('Angular RAG application')
      .setDescription('RAG application to get answers from an Angular book using Langchain.js and Gemma 2 model')
      .setVersion('1.0')
      .addTag('Gemma 2, Langchain.js, RAG')
      .build();
    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup('api', this.app, document);
  }
}
