import { ConversationContent } from '~rag-tech-book/application/types/conversation-content.type';

export const toDivRow = (contents: ConversationContent[]): string => {
  return contents
    .map(({ role, content }) => `<div class="response"><span>${role}</span><span>${content}</span></div>`)
    .join('');
};
