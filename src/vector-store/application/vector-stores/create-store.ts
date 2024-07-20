import { VectorStore } from '@langchain/core/vectorstores';
import { InternalServerErrorException } from '@nestjs/common';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { VectorStoreConfig, VectorStoreFactoryConfig } from '../types/vector-store-config.type';

async function createMemoryVectorStore({ docs, embeddings }: VectorStoreConfig): Promise<VectorStore> {
  const memoryVectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);
  return memoryVectorStore;
}

export function createVectorStore({ type, ...rest }: VectorStoreFactoryConfig): Promise<VectorStore> {
  if (type === 'MEMORY') {
    return createMemoryVectorStore(rest);
  } else {
    throw new InternalServerErrorException('Invalid type of vector store.');
  }
}
