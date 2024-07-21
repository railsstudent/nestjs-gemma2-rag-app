import { Module } from '@nestjs/common';
import { GroqModule } from '~groq/groq.module';
import { VectorStoreModule } from '~vector-store/vector-store.module';

@Module({
  imports: [GroqModule, VectorStoreModule.register('GEMINI_AI', 'QDRANT')],
})
export class RagChainModule {}
