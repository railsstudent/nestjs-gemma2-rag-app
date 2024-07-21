import { Document } from '@langchain/core/documents';
import { Embeddings } from '@langchain/core/embeddings';
import { VectorDatabasesType } from './vector-databases.type';

export type VectorDatabaseFactoryConfig = {
  docs: Document<Record<string, any>>[];
  type: VectorDatabasesType;
  embeddings: Embeddings;
};

export type DatabaseConfig = Omit<VectorDatabaseFactoryConfig, 'type'>;

export type QueryParameters = {
  query: string;
  numResults?: number;
};
