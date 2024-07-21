import { DocumentInterface } from '@langchain/core/documents';
import { VectorStore } from '@langchain/core/vectorstores';
import { Injectable, Logger } from '@nestjs/common';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { VectorStoreContract } from '../interfaces/vector-store-contract.interface';
import { VectorQueryParameters, VectorStoreConfig } from '../types/vector-store-config.type';

@Injectable()
export class MemoryVectorStoreService implements VectorStoreContract {
  private readonly logger = new Logger(MemoryVectorStoreService.name);
  private vectorStore: VectorStore;

  async init({ docs, embeddings }: VectorStoreConfig): Promise<void> {
    this.logger.log('MemoryVectorStoreService init called');
    this.vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);
  }

  similaritySearch(queryParameters: VectorQueryParameters): Promise<DocumentInterface[]> {
    const { query, numResults = 1 } = queryParameters;
    return this.vectorStore.similaritySearch(query, numResults);
  }

  async similaritySearchWithScore(
    queryParameters: VectorQueryParameters,
  ): Promise<{ doc: DocumentInterface; score: number }[]> {
    const { query, numResults = 1 } = queryParameters;
    const results = await this.vectorStore.similaritySearchWithScore(query, numResults);
    return results.map(([doc, score]) => ({ doc, score }));
  }
}
