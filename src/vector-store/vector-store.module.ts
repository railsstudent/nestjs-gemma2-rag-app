import { DynamicModule, InternalServerErrorException, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TEXT_EMBEDDING_MODEL, VECTOR_STORE_TYPE } from './application/constants/rag.constant';
import { createTextEmbeddingModel } from './application/embeddings/create-embedding-model';
import { EmbeddingModels } from './application/types/embedding-models.type';
import { VectorStoresType } from './application/types/vector-stores.type';
import { VectorStoreService } from './application/vector-store.service';
import { VectorStoreController } from './presenters/vector-store.controller';

@Module({
  providers: [VectorStoreService],
  controllers: [VectorStoreController],
})
export class VectorStoreModule {
  static register(embeddingModel: EmbeddingModels, vectorStoreType: VectorStoresType): DynamicModule {
    if (embeddingModel === 'GEMINI_AI') {
    } else if (embeddingModel === 'HUGGINGFACE_INFERENCE') {
    } else {
      throw new InternalServerErrorException('Invalid type of embedding model.');
    }

    return {
      module: VectorStoreModule,
      providers: [
        {
          provide: TEXT_EMBEDDING_MODEL,
          useFactory: (configService: ConfigService) => createTextEmbeddingModel(configService, embeddingModel),
          inject: [ConfigService],
        },
        {
          provide: VECTOR_STORE_TYPE,
          useValue: vectorStoreType,
        },
      ],
    };
  }
}
