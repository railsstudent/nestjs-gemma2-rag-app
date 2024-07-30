import { ConversationContent } from '~rag-tech-book/application/types/conversation-content.type';

export const toDivRow = (contents: ConversationContent[]): string => {
  return contents
    .map(
      ({ role, content }) => `
      <div class="text-[1rem] flex text-[#464646]">
        <span class="w-1/5 p-1 border border-solid border-[#464646]">${role}</span>
        <span class="w-4/5 p-1 border border-solid border-[#464646] prose">${content}</span>
      </div>`,
    )
    .join('');
};
