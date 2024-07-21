import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { RunnablePassthrough, RunnableSequence } from '@langchain/core/runnables';
import { ChatGroq } from '@langchain/groq';
import { Inject, Injectable } from '@nestjs/common';
import { formatDocumentsAsString } from 'langchain/util/document';
import { GROQ_CHAT_MODEL } from '~groq/application/constants/groq.constant';
import { VectorStoreService } from '~vector-store/application/vector-store.service';

@Injectable()
export class RagService {
  constructor(
    @Inject(GROQ_CHAT_MODEL) private model: ChatGroq,
    private vectorStoreService: VectorStoreService,
  ) {}

  async ask(query: string): Promise<string> {
    const prompt = ChatPromptTemplate.fromTemplate(`
        You are an assistant for question-answering tasks. Use the following pieces of retrieved context to answer the question. If you don't know the answer, just say that you don't know.
        Question: {question}
        Context: {context}
        Answer:
    `);

    const retriever = this.vectorStoreService.asRetriever();
    const output = new StringOutputParser();
    const ragChain = RunnableSequence.from([
      {
        context: retriever.pipe(formatDocumentsAsString),
        question: new RunnablePassthrough(),
      },
      prompt,
      this.model,
      output,
    ]);

    return ragChain.invoke(query);
  }
}
