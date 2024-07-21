import { DocumentInterface } from '@langchain/core/documents';
import { QueryParameters, DatabaseConfig } from '../types/vector-store-config.type';

export type DoctorInterfaceWithScore = {
  doc: DocumentInterface;
  score: number;
};

export interface VectorDatabase {
  init(config: DatabaseConfig): Promise<void>;
  similaritySearch(queryParameters: QueryParameters): Promise<DocumentInterface[]>;
  similaritySearchWithScore(queryParameters: QueryParameters): Promise<DoctorInterfaceWithScore[]>;
}
