import { Module } from '@nestjs/common';
import { VectorStoreService } from './application/vector-store.service';
import { VectorStoreController } from './presenters/vector-store.controller';

@Module({
  providers: [VectorStoreService],
  controllers: [VectorStoreController],
})
export class VectorStoreModule {}
