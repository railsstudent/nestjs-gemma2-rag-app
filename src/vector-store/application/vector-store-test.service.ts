import { Embeddings } from '@langchain/core/embeddings';
import { Inject, Injectable } from '@nestjs/common';
import { TEXT_EMBEDDING_MODEL } from './constants/rag.constant';
import { VectorStoreService } from './vector-store.service';

@Injectable()
export class VectorStoreTestService {
  constructor(
    @Inject(TEXT_EMBEDDING_MODEL) private embeddings: Embeddings,
    private vectorStoreService: VectorStoreService,
  ) {}

  async testEmbedding(): Promise<number[]> {
    return this.embeddings.embedQuery('Register embedding model in NestJS is OK.');
  }

  async testSimilaritySearchWithScore() {
    return this.vectorStoreService.similaritySearchWithScore('server-side rendering', 3);
  }

  async testSimilaritySearch() {
    return this.vectorStoreService.similaritySearch('server-side rendering', 3);
  }
}
