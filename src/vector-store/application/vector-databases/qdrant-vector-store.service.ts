import { DocumentInterface } from '@langchain/core/documents';
import { VectorStore } from '@langchain/core/vectorstores';
import { QdrantVectorStore } from '@langchain/qdrant';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QdrantClient } from '@qdrant/js-client-rest';
import { VectorStoreContract } from '../interfaces/vector-store-contract.interface';
import { VectorQueryParameters, VectorStoreConfig } from '../types/vector-store-config.type';
import { QdrantDatabaseConfig } from '../types/qdrant-database-config.type';

const COLLECTION_NAME = 'angular_evolution_collection';

@Injectable()
export class QdrantVectorStoreService implements VectorStoreContract {
  private readonly logger = new Logger(QdrantVectorStoreService.name);
  private vectorStore: VectorStore;

  constructor(private configService: ConfigService) {}

  async init({ docs, embeddings }: VectorStoreConfig): Promise<void> {
    this.logger.log('QdrantVectorStoreService init called');
    const { url, apiKey } = this.configService.get<QdrantDatabaseConfig>('qdrant');
    const client = new QdrantClient({ url, apiKey });
    const { exists: isCollectionExists } = await client.collectionExists(COLLECTION_NAME);
    if (isCollectionExists) {
      const isDeleted = await client.deleteCollection(COLLECTION_NAME);
      if (!isDeleted) {
        throw new InternalServerErrorException(`Unable to delete ${COLLECTION_NAME}`);
      }
      this.logger.log(`QdrantVectorStoreService deletes ${COLLECTION_NAME}. Result -> ${isDeleted}`);
    }

    const size = (await embeddings.embedQuery('test')).length;
    const isSuccess = await client.createCollection(COLLECTION_NAME, {
      vectors: { size, distance: 'Cosine' },
    });

    if (!isSuccess) {
      throw new InternalServerErrorException(`Unable to create collection ${COLLECTION_NAME}`);
    }

    this.vectorStore = await QdrantVectorStore.fromDocuments(docs, embeddings, {
      client,
      collectionName: COLLECTION_NAME,
    });
  }

  similaritySearch(queryParameters: VectorQueryParameters): Promise<DocumentInterface[]> {
    const { query, numResults = 1 } = queryParameters;
    return this.vectorStore.similaritySearch(query, numResults);
  }

  async similaritySearchWithScore(
    queryParameters: VectorQueryParameters,
  ): Promise<{ doc: DocumentInterface; score: number }[]> {
    const { query, numResults = 1 } = queryParameters;
    const results = await this.vectorStore.similaritySearchWithScore(query, numResults);
    return results.map(([doc, score]) => ({ doc, score }));
  }
}
