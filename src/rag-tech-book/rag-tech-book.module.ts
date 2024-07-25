import { Module } from '@nestjs/common';
import { GroqModule } from '~groq/groq.module';
import { VectorStoreModule } from '~vector-store/vector-store.module';
import { RagService } from './application/rag.service';
import { RagController } from './presenters/http/rag.controller';

@Module({
  imports: [GroqModule, VectorStoreModule.register('GEMINI_AI', 'MEMORY')],
  providers: [RagService],
  controllers: [RagController],
})
export class RagTechBookModule {}
