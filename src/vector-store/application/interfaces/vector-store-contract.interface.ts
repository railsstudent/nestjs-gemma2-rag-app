import { VectorQueryParameters, VectorStoreConfig } from '../types/vector-store-config.type';
import { DocumentInterface } from '@langchain/core/documents';

export interface VectorStoreContract {
  init(config: VectorStoreConfig): Promise<void>;
  similaritySearch(queryParameters: VectorQueryParameters): Promise<DocumentInterface[]>;
  similaritySearchWithScore(
    queryParameters: VectorQueryParameters,
  ): Promise<{ doc: DocumentInterface; score: number }[]>;
}
