import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TEXT_EMBEDDING_MODEL, VECTOR_DATABASE, VECTOR_STORE_TYPE } from './application/constants/rag.constant';
import { createTextEmbeddingModel } from './application/embeddings/create-embedding-model';
import { MemoryVectorStoreService } from './application/memory-vector-store.service';
import { QdrantVectorStoreService } from './application/qdrant-vector-store.service';
import { EmbeddingModels } from './application/types/embedding-models.type';
import { VectorStoresType } from './application/types/vector-stores.type';
import { VectorStoreTestService } from './application/vector-store-test.service';
import { VectorStoreService } from './application/vector-store.service';
import { VectorStoreController } from './presenters/vector-store.controller';

@Module({
  providers: [VectorStoreService, QdrantVectorStoreService, VectorStoreTestService, MemoryVectorStoreService],
  controllers: [VectorStoreController],
})
export class VectorStoreModule {
  static register(embeddingModel: EmbeddingModels, vectorStoreType: VectorStoresType): DynamicModule {
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
        {
          provide: VECTOR_DATABASE,
          useFactory: (type: VectorStoresType, configService: ConfigService) => {
            if (type === 'MEMORY') {
              return new MemoryVectorStoreService();
            } else if (type === 'QDRANT') {
              return new QdrantVectorStoreService(configService);
            }
          },
          inject: [VECTOR_STORE_TYPE, ConfigService],
        },
      ],
    };
  }
}
