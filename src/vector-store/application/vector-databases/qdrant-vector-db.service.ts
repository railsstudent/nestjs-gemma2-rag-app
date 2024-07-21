import { VectorStore, VectorStoreRetriever } from '@langchain/core/vectorstores';
import { QdrantVectorStore } from '@langchain/qdrant';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QdrantClient } from '@qdrant/js-client-rest';
import { VectorDatabase } from '../interfaces/vector-database.interface';
import { QdrantDatabaseConfig } from '../types/qdrant-database-config.type';
import { DatabaseConfig } from '../types/vector-store-config.type';

const COLLECTION_NAME = 'angular_evolution_collection';

@Injectable()
export class QdrantVectorDBService implements VectorDatabase {
  private readonly logger = new Logger(QdrantVectorDBService.name);
  private vectorStore: VectorStore;

  constructor(private configService: ConfigService) {}

  async init({ docs, embeddings }: DatabaseConfig): Promise<void> {
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

  asRetriever(): VectorStoreRetriever<VectorStore> {
    return this.vectorStore.asRetriever();
  }
}
