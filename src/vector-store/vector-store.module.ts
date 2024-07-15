import { Embeddings } from '@langchain/core/embeddings';
import { DynamicModule, InternalServerErrorException, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TEXT_EMBEDDING_MODEL } from './application/constants/rag.constant';
import { createGeminiTextEmbeddingModel } from './application/embeddings/gemini-embedding-model';
import { createHuggingfaceInferenceEmbeddingModel } from './application/embeddings/huggingface-inference-model';
import { EmbeddingModels } from './application/types/embedding-models.type';
import { VectorStoreService } from './application/vector-store.service';
import { VectorStoreController } from './presenters/vector-store.controller';

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
      providers: [
        {
          provide: TEXT_EMBEDDING_MODEL,
          useFactory: (configService: ConfigService): Embeddings => {
            if (embeddingModel === 'GEMINI_AI') {
              return createGeminiTextEmbeddingModel(configService);
            } else if (embeddingModel === 'HUGGINGFACE_INFERENCE') {
              return createHuggingfaceInferenceEmbeddingModel(configService);
            } else {
              throw new InternalServerErrorException('Invalid type of embedding model.');
            }
          },
          inject: [ConfigService],
        },
      ],
    };
  }
}
