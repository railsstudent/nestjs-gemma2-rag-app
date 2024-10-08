import { Embeddings } from '@langchain/core/embeddings';
import { VectorStore, VectorStoreRetriever } from '@langchain/core/vectorstores';
import { Inject, Injectable, Logger } from '@nestjs/common';
import path from 'path';
import { appConfig } from '~configs/root-path.config';
import { ANGULAR_EVOLUTION_BOOK, TEXT_EMBEDDING_MODEL, VECTOR_DATABASE } from './constants/rag.constant';
import { VectorDatabase } from './interfaces/vector-database.interface';
import { loadPdf } from './loaders/pdf-loader';

@Injectable()
export class VectorStoreService {
  private readonly logger = new Logger(VectorStoreService.name);

  constructor(
    @Inject(TEXT_EMBEDDING_MODEL) embeddings: Embeddings,
    @Inject(VECTOR_DATABASE) private dbService: VectorDatabase,
  ) {
    this.createDatabase(embeddings, this.dbService);
  }

  private async createDatabase(embeddings: Embeddings, dbService: VectorDatabase) {
    const docs = await this.loadDocuments();
    await dbService.init({ docs, embeddings });
  }

  private async loadDocuments() {
    const bookFullPath = path.join(appConfig.rootPath, ANGULAR_EVOLUTION_BOOK);
    const docs = await loadPdf(bookFullPath);
    this.logger.log(`number of docs -> ${docs.length}`);
    // if (docs.length > 0) {
    //   const firstPage = docs[0];
    //   console.log("first page's metadata", firstPage.metadata);
    //   console.log('first page', firstPage.pageContent);
    // }
    return docs;
  }

  asRetriever(): VectorStoreRetriever<VectorStore> {
    this.logger.log(`return vector retriever`);
    return this.dbService.asRetriever();
  }
}
