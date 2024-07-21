import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TEXT_EMBEDDING_MODEL, VECTOR_DATABASE, VECTOR_STORE_TYPE } from './application/constants/rag.constant';
import { createTextEmbeddingModel } from './application/embeddings/create-embedding-model';
import { EmbeddingModels } from './application/types/embedding-models.type';
import { VectorDatabasesType } from './application/types/vector-databases.type';
import { createVectorDatabase, MemoryVectorDBService, QdrantVectorDBService } from './application/vector-databases';
import { VectorStoreTestService } from './application/vector-store-test.service';
import { VectorStoreService } from './application/vector-store.service';
import { VectorStoreController } from './presenters/vector-store.controller';

@Module({
  providers: [VectorStoreService, VectorStoreTestService, MemoryVectorDBService, QdrantVectorDBService],
  controllers: [VectorStoreController],
  exports: [VectorStoreService],
})
export class VectorStoreModule {
  static register(embeddingModel: EmbeddingModels, vectorStoreType: VectorDatabasesType): DynamicModule {
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
          useFactory: (type: VectorDatabasesType, configService: ConfigService) =>
            createVectorDatabase(type, configService),
          inject: [VECTOR_STORE_TYPE, ConfigService],
        },
      ],
    };
  }
}
