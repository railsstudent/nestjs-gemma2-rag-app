import { InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VectorDatabasesType } from '../types/vector-databases.type';
import { MemoryVectorDBService } from './memory-vector-db.service';
import { QdrantVectorDBService } from './qdrant-vector-db.service';

export function createVectorDatabase(type: VectorDatabasesType, configService: ConfigService) {
  if (type === 'MEMORY') {
    return new MemoryVectorDBService();
  } else if (type === 'QDRANT') {
    return new QdrantVectorDBService(configService);
  }
  throw new InternalServerErrorException(`Invalid vector store type: ${type}`);
}
