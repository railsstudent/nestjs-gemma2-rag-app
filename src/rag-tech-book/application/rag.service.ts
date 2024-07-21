import { BaseMessage } from '@langchain/core/messages';
import { Runnable, RunnablePassthrough, RunnableSequence } from '@langchain/core/runnables';
import { ChatGroq } from '@langchain/groq';
import { Inject, Injectable } from '@nestjs/common';
import { formatDocumentsAsString } from 'langchain/util/document';
import { GROQ_CHAT_MODEL } from '~groq/application/constants/groq.constant';
import { VectorStoreService } from '~vector-store/application/vector-store.service';
import { createContextualizedQuestion } from './chain-with-history/create-contextual-chain';
import { qaPrompt } from './constants/prompts.constant';

@Injectable()
export class RagService {
  private chat_history: BaseMessage[] = [];

  constructor(
    @Inject(GROQ_CHAT_MODEL) private model: ChatGroq,
    private vectorStoreService: VectorStoreService,
  ) {}

  async ask(question: string): Promise<string> {
    const contextualizedQuestion = createContextualizedQuestion(this.model);
    const retriever = this.vectorStoreService.asRetriever();

    try {
      const ragChain = RunnableSequence.from([
        RunnablePassthrough.assign({
          context: (input: Record<string, unknown>) => {
            if ('chat_history' in input) {
              const chain = contextualizedQuestion(input);
              return (chain as Runnable).pipe(retriever).pipe(formatDocumentsAsString);
            }
            return '';
          },
        }),
        qaPrompt,
        this.model,
      ]);

      const aiMessage = await ragChain.invoke({ question, chat_history: this.chat_history });
      this.chat_history = this.chat_history.concat(aiMessage);
      if (this.chat_history.length > 10) {
        this.chat_history.shift();
      }
      return (aiMessage.content as string) || '';
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
  }
}
