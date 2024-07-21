import { InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VectorStoresType } from '../types/vector-stores.type';
import { MemoryVectorStoreService } from './memory-vector-store.service';
import { QdrantVectorStoreService } from './qdrant-vector-store.service';

export function createVectorDatabase(type: VectorStoresType, configService: ConfigService) {
  if (type === 'MEMORY') {
    return new MemoryVectorStoreService();
  } else if (type === 'QDRANT') {
    return new QdrantVectorStoreService(configService);
  }
  throw new InternalServerErrorException(`Invalid vector store type: ${type}`);
}
