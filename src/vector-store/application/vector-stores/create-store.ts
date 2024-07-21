import { VectorStore } from '@langchain/core/vectorstores';
import { QdrantVectorStore } from '@langchain/qdrant';
import { InternalServerErrorException } from '@nestjs/common';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { VectorStoreConfig, VectorStoreFactoryConfig } from '../types/vector-store-config.type';

async function createMemoryVectorStore({ docs, embeddings }: VectorStoreConfig): Promise<VectorStore> {
  const memoryVectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);
  return memoryVectorStore;
}

async function createQDrantVectorStore({ docs, embeddings }: VectorStoreConfig): Promise<VectorStore> {
  const memoryVectorStore = await QdrantVectorStore.fromDocuments(docs, embeddings, {
    url: '',
    apiKey: '',
    collectionName: 'angular_evolution_collection',
  });
  return memoryVectorStore;
}

export function createVectorStore({ type, ...rest }: VectorStoreFactoryConfig): Promise<VectorStore> {
  if (type === 'MEMORY') {
    return createMemoryVectorStore(rest);
  } else if (type === 'QDRANT') {
    return createQDrantVectorStore(rest);
  } else {
    throw new InternalServerErrorException('Invalid type of vector store.');
  }
}
