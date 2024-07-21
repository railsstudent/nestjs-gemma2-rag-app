import { DocumentInterface } from '@langchain/core/documents';
import { VectorStore } from '@langchain/core/vectorstores';
import { Injectable } from '@nestjs/common';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { VectorStoreContract } from './interfaces/vector-store-contract.interface';
import { VectorQueryParameters, VectorStoreConfig } from './types/vector-store-config.type';

@Injectable()
export class MemoryVectorStoreService implements VectorStoreContract {
  create({ docs, embeddings }: VectorStoreConfig): Promise<VectorStore> {
    return MemoryVectorStore.fromDocuments(docs, embeddings);
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
