import { VectorStore, VectorStoreRetriever } from '@langchain/core/vectorstores';
import { DatabaseConfig } from '../types/vector-store-config.type';

export interface VectorDatabase {
  init(config: DatabaseConfig): Promise<void>;
  asRetriever(): VectorStoreRetriever<VectorStore>;
}
