import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatGroq } from '@langchain/groq';
import { contextualizeQPrompt } from '../constants/prompts.constant';

export function createContextualizedQuestion(llm: ChatGroq) {
  const contextualizeQChain = contextualizeQPrompt.pipe(llm).pipe(new StringOutputParser());

  return (input: Record<string, unknown>) => {
    if ('chat_history' in input) {
      return contextualizeQChain;
    }
    return input.question;
  };
}
