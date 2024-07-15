import { TaskType } from '@google/generative-ai';
import { HuggingFaceInferenceEmbeddings } from '@langchain/community/embeddings/hf';
import { Embeddings } from '@langchain/core/embeddings';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmbeddingModelConfig } from '../types/embedding-model-config.type';
import { EmbeddingModels } from '../types/embedding-models.type';

function createGeminiTextEmbeddingModel(configService: ConfigService) {
  const { apiKey, embeddingModel: model } = configService.get<EmbeddingModelConfig>('gemini');
  return new GoogleGenerativeAIEmbeddings({
    apiKey,
    model,
    taskType: TaskType.RETRIEVAL_DOCUMENT,
    title: 'Angular Book',
  });
}

function createHuggingfaceInferenceEmbeddingModel(configService: ConfigService) {
  const { apiKey, embeddingModel: model } = configService.get<EmbeddingModelConfig>('huggingface');
  return new HuggingFaceInferenceEmbeddings({
    apiKey,
    model,
  });
}

export function createTextEmbeddingModel(configService: ConfigService, embeddingModel: EmbeddingModels): Embeddings {
  if (embeddingModel === 'GEMINI_AI') {
    return createGeminiTextEmbeddingModel(configService);
  } else if (embeddingModel === 'HUGGINGFACE_INFERENCE') {
    return createHuggingfaceInferenceEmbeddingModel(configService);
  } else {
    throw new InternalServerErrorException('Invalid type of embedding model.');
  }
}
