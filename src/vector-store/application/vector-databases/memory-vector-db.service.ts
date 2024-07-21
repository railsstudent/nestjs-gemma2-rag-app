import { DocumentInterface } from '@langchain/core/documents';
import { VectorStore, VectorStoreRetriever } from '@langchain/core/vectorstores';
import { Injectable, Logger } from '@nestjs/common';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { VectorDatabase } from '../interfaces/vector-database.interface';
import { QueryParameters, DatabaseConfig } from '../types/vector-store-config.type';

@Injectable()
export class MemoryVectorDBService implements VectorDatabase {
  private readonly logger = new Logger(MemoryVectorDBService.name);
  private vectorStore: VectorStore;

  async init({ docs, embeddings }: DatabaseConfig): Promise<void> {
    this.logger.log('MemoryVectorStoreService init called');
    this.vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);
  }

  similaritySearch(queryParameters: QueryParameters): Promise<DocumentInterface[]> {
    const { query, numResults = 1 } = queryParameters;
    return this.vectorStore.similaritySearch(query, numResults);
  }

  async similaritySearchWithScore(
    queryParameters: QueryParameters,
  ): Promise<{ doc: DocumentInterface; score: number }[]> {
    const { query, numResults = 1 } = queryParameters;
    const results = await this.vectorStore.similaritySearchWithScore(query, numResults);
    return results.map(([doc, score]) => ({ doc, score }));
  }

  asRetriever(): VectorStoreRetriever<VectorStore> {
    return this.vectorStore.asRetriever();
  }
}
