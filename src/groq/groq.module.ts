import { Module } from '@nestjs/common';
import { GroqChatModelProvider } from './application/providers/groq-chat-model.provider';
import { GroqService } from './application/groq.service';
import { GroqController } from './presenters/http/groq.controller';

@Module({
  providers: [GroqChatModelProvider, GroqService],
  controllers: [GroqController],
  exports: [GroqChatModelProvider],
})
export class GroqModule {}
