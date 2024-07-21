import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import configuration from '~/configs/configuration';
import { throttlerConfig } from '~configs/throttler.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RagChainModule } from './rag-chain/rag-chain.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    throttlerConfig,
    RagChainModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
