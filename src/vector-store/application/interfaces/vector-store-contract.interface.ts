import { VectorStore } from '@langchain/core/vectorstores';
import { VectorQueryParameters, VectorStoreConfig } from '../types/vector-store-config.type';
import { DocumentInterface } from '@langchain/core/documents';

export interface VectorStoreContract {
  create(config: VectorStoreConfig): Promise<VectorStore>;
  similaritySearch(queryParameters: VectorQueryParameters): Promise<DocumentInterface[]>;
  similaritySearchWithScore(
    queryParameters: VectorQueryParameters,
  ): Promise<{ doc: DocumentInterface; score: number }[]>;
}
