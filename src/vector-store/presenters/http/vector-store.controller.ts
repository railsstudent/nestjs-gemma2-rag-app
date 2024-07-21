import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { VectorStoreTestService } from '~vector-store/application/vector-store-test.service';

@ApiTags('Vector Store')
@Controller('vector-store')
export class VectorStoreController {
  constructor(private service: VectorStoreTestService) {}

  @ApiResponse({
    description: "Retrieve retriever's name",
    type: String,
    status: HttpStatus.OK,
  })
  @Get('retriever')
  async testRetriever() {
    return (await this.service.testRetriever()).getName();
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
