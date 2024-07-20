import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { VectorStoreService } from '~vector-store/application/vector-store.service';

@ApiTags('Vector Store')
@Controller('vector-store')
export class VectorStoreController {
  constructor(private service: VectorStoreService) {}

  @ApiResponse({
    description: 'Create a vector store',
    type: Object,
    status: HttpStatus.OK,
  })
  @Get()
  async testVectorStore() {
    return this.service.testVectorStore();
  }

  @ApiResponse({
    description: 'Generate an embedding vector',
    type: Number,
    isArray: true,
    status: HttpStatus.OK,
  })
  @Get('embedding')
  testTextEmbedding(): Promise<number[]> {
    return this.service.testEmbedding();
  }
}
