import { ChatGroq } from '@langchain/groq';
import { Inject, Injectable } from '@nestjs/common';
import { GROQ_CHAT_MODEL } from './constants/groq.constant';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { MessageContent } from '@langchain/core/messages';

@Injectable()
export class GroqService {
  constructor(@Inject(GROQ_CHAT_MODEL) private model: ChatGroq) {}

  async generateText(input: string): Promise<MessageContent> {
    const prompt = ChatPromptTemplate.fromMessages([
      ['system', 'You are a helpful assistant'],
      ['human', '{input}'],
    ]);

    const chain = prompt.pipe(this.model);
    const response = await chain.invoke({
      input,
    });

    return response.content;
  }
}
