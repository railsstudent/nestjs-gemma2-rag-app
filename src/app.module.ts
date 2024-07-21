import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import configuration from '~/configs/configuration';
import { GroqModule } from '~groq/groq.module';
import { VectorStoreModule } from '~vector-store/vector-store.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { throttlerConfig } from '~configs/throttler.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    throttlerConfig,
    GroqModule,
    VectorStoreModule.register('GEMINI_AI', 'MEMORY'),
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
