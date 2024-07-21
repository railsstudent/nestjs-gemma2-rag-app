import { DocumentInterface } from '@langchain/core/documents';
import { Embeddings } from '@langchain/core/embeddings';
import { Inject, Injectable, Logger } from '@nestjs/common';
import path from 'path';
import { appConfig } from '~configs/root-path.config';
import { ANGULAR_EVOLUTION_BOOK, TEXT_EMBEDDING_MODEL, VECTOR_DATABASE } from './constants/rag.constant';
import { VectorStoreContract } from './interfaces/vector-store-contract.interface';
import { loadPdf } from './loaders/pdf-loader';

@Injectable()
export class VectorStoreService {
  private readonly logger = new Logger(VectorStoreService.name);

  constructor(
    @Inject(TEXT_EMBEDDING_MODEL) embeddings: Embeddings,
    @Inject(VECTOR_DATABASE) private vectorStoreService: VectorStoreContract,
  ) {
    this.createVectorStore(embeddings, this.vectorStoreService);
  }

  private async createVectorStore(embeddings: Embeddings, vectoreStoreService: VectorStoreContract) {
    const docs = await this.loadDocuments();
    await vectoreStoreService.init({ docs, embeddings });
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

  similaritySearchWithScore(query: string, numResults = 1): Promise<{ doc: DocumentInterface; score: number }[]> {
    this.logger.log(`similaritySearchWithScore query -> ${query}, numResults -> ${numResults}`);
    return this.vectorStoreService.similaritySearchWithScore({ query, numResults });
  }

  similaritySearch(query: string, numResults = 1): Promise<DocumentInterface[]> {
    this.logger.log(`similaritySearch query -> ${query}, numResults -> ${numResults}`);
    return this.vectorStoreService.similaritySearch({ query, numResults });
  }
}
