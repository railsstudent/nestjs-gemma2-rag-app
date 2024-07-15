import { Embeddings } from '@langchain/core/embeddings';
import { Inject, Injectable } from '@nestjs/common';
import path from 'path';
import { appConfig } from '~configs/root-path.config';
import { ANGULAR_EVOLUTION_BOOK, TEXT_EMBEDDING_MODEL } from './constants/rag.constant';
import { loadPdf } from './loaders/pdf-loader';

@Injectable()
export class VectorStoreService {
  constructor(@Inject(TEXT_EMBEDDING_MODEL) private embeddingModel: Embeddings) {}

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

  async createStore() {
    await this.loadDocuments();
  }

  async testEmbedding(): Promise<number[]> {
    return this.embeddingModel.embedQuery('Register embedding model in NestJS is OK.');
  }
}
