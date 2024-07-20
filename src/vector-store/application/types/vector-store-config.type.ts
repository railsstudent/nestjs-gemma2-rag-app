import { Document } from '@langchain/core/documents';
import { Embeddings } from '@langchain/core/embeddings';
import { VectorStoresType } from './vector-stores.type';

export type VectorStoreFactoryConfig = {
  docs: Document<Record<string, any>>[];
  type: VectorStoresType;
  embeddings: Embeddings;
};

export type VectorStoreConfig = Omit<VectorStoreFactoryConfig, 'type'>;
