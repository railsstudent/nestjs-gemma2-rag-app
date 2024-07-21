import { DocumentInterface } from '@langchain/core/documents';
import { VectorStore } from '@langchain/core/vectorstores';
import { QdrantVectorStore } from '@langchain/qdrant';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VectorStoreContract } from './interfaces/vector-store-contract.interface';
import { QdrantDatabaseConfig } from './types/qdrant-database-config.type';
import { VectorQueryParameters, VectorStoreConfig } from './types/vector-store-config.type';

@Injectable()
export class QdrantVectorStoreService implements VectorStoreContract {
  constructor(private configService: ConfigService) {}

  async create({ docs, embeddings }: VectorStoreConfig): Promise<VectorStore> {
    const { url, apiKey } = this.configService.get<QdrantDatabaseConfig>('qdrant');
    const vectorStore = await QdrantVectorStore.fromDocuments(docs, embeddings, {
      url,
      apiKey,
      collectionName: 'angular_evolution_collection',
    });
    return vectorStore;
  }

  similaritySearch(queryParameters: VectorQueryParameters): Promise<DocumentInterface[]> {
    const { vectorStore, query, numResults = 1 } = queryParameters;
    return vectorStore.similaritySearch(query, numResults);
  }

  async similaritySearchWithScore(
    queryParameters: VectorQueryParameters,
  ): Promise<{ doc: DocumentInterface; score: number }[]> {
    const { vectorStore, query, numResults = 1 } = queryParameters;
    const results = await vectorStore.similaritySearchWithScore(query, numResults);
    return results.map(([doc, score]) => ({ doc, score }));
  }
}
