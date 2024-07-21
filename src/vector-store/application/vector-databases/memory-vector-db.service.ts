import { VectorStore, VectorStoreRetriever } from '@langchain/core/vectorstores';
import { Injectable, Logger } from '@nestjs/common';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { VectorDatabase } from '../interfaces/vector-database.interface';
import { DatabaseConfig } from '../types/vector-store-config.type';

@Injectable()
export class MemoryVectorDBService implements VectorDatabase {
  private readonly logger = new Logger(MemoryVectorDBService.name);
  private vectorStore: VectorStore;

  async init({ docs, embeddings }: DatabaseConfig): Promise<void> {
    this.logger.log('MemoryVectorStoreService init called');
    this.vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);
  }

  asRetriever(): VectorStoreRetriever<VectorStore> {
    return this.vectorStore.asRetriever();
  }
}
