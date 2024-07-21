import { Embeddings } from '@langchain/core/embeddings';
import { Inject, Injectable } from '@nestjs/common';
import path from 'path';
import { appConfig } from '~configs/root-path.config';
import { ANGULAR_EVOLUTION_BOOK, TEXT_EMBEDDING_MODEL, VECTOR_STORE_TYPE } from './constants/rag.constant';
import { loadPdf } from './loaders/pdf-loader';
import { VectorStore } from '@langchain/core/vectorstores';
import { createVectorStore } from './vector-stores/create-store';
import { VectorStoresType } from './types/vector-stores.type';

@Injectable()
export class VectorStoreTestService {
  private vectorStore: VectorStore;

  constructor(
    @Inject(TEXT_EMBEDDING_MODEL) private embeddings: Embeddings,
    @Inject(VECTOR_STORE_TYPE) type: VectorStoresType,
  ) {
    this.createVectorStore(type, this.embeddings);
  }

  private async createVectorStore(type: VectorStoresType, embeddings: Embeddings) {
    const docs = await this.loadDocuments();
    this.vectorStore = await createVectorStore({ docs, type, embeddings });
  }

  private async loadDocuments() {
    const bookFullPath = path.join(appConfig.rootPath, ANGULAR_EVOLUTION_BOOK);
    console.log(bookFullPath);
    const docs = await loadPdf(bookFullPath);
    console.log('number of docs', docs.length);
    if (docs.length > 0) {
      const firstPage = docs[0];
      const lastPage = docs[docs.length - 1];
      console.log("first page's metadata", firstPage.metadata);
      console.log('first page', firstPage.pageContent);
      console.log("last page's metadata", lastPage.metadata);
      console.log('last page', lastPage.pageContent);
    }
    return docs;
  }

  // async createStore() {
  //   await this.loadDocuments();
  // }

  async testEmbedding(): Promise<number[]> {
    return this.embeddings.embedQuery('Register embedding model in NestJS is OK.');
  }

  async testVectorStore() {
    return this.vectorStore.similaritySearchWithScore('New control flow', 3);
  }
}
