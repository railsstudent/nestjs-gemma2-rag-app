import { DynamicModule, InternalServerErrorException, Module } from '@nestjs/common';
import { VectorStoreService } from './application/vector-store.service';
import { VectorStoreController } from './presenters/vector-store.controller';
import { EmbeddingModels } from './application/types/embedding-models.type';

@Module({
  providers: [VectorStoreService],
  controllers: [VectorStoreController],
})
export class VectorStoreModule {
  static register(embeddingModel: EmbeddingModels): DynamicModule {
    if (embeddingModel === 'GEMINI_AI') {
    } else if (embeddingModel === 'HUGGINGFACE_INFERENCE') {
    } else {
      throw new InternalServerErrorException('Invalid type of embedding model.');
    }

    return {
      module: VectorStoreModule,
      providers: [],
    };
  }
}
