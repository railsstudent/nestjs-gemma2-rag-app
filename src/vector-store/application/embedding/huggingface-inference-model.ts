import { HuggingFaceInferenceEmbeddings } from '@langchain/community/embeddings/hf';
import { ConfigService } from '@nestjs/config';
import { EmbeddingModelConfig } from '../types/embedding-model-config.type';

export function createHuggingfaceInferenceEmbeddingModel(configService: ConfigService) {
  const { apiKey, embeddingModel: model } = configService.get<EmbeddingModelConfig>('huggingface');
  return new HuggingFaceInferenceEmbeddings({
    apiKey,
    model,
  });
}
