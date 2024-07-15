import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '~/configs/configuration';
import { GroqModule } from '~groq/groq.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VectorStoreModule } from './vector-store/vector-store.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    GroqModule,
    VectorStoreModule.register('HUGGINGFACE_INFERENCE'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
