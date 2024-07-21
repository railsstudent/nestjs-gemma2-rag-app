import { Document } from '@langchain/core/documents';
import { Embeddings } from '@langchain/core/embeddings';
import { VectorStoresType } from './vector-stores.type';
import { VectorStore } from '@langchain/core/vectorstores';

export type VectorStoreFactoryConfig = {
  docs: Document<Record<string, any>>[];
  type: VectorStoresType;
  embeddings: Embeddings;
};

export type VectorStoreConfig = Omit<VectorStoreFactoryConfig, 'type'>;

export type VectorQueryParameters = {
  vectorStore: VectorStore;
  query: string;
  numResults?: number;
};
