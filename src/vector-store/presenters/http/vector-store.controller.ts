import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { VectorStoreTestService } from '~vector-store/application/vector-store-test.service';

@ApiTags('Vector Store')
@Controller('vector-store')
export class VectorStoreController {
  constructor(private service: VectorStoreTestService) {}

  @ApiResponse({
    description: 'Test similarity search',
    type: Object,
    status: HttpStatus.OK,
  })
  @Get('similarity-search')
  async testSimilaritySearch() {
    return this.service.testSimilaritySearch();
  }

  @ApiResponse({
    description: 'Test similarity search with score',
    type: Object,
    status: HttpStatus.OK,
  })
  @Get('similarity-search-with-score')
  async testSimilaritySearchWithScore() {
    return this.service.testSimilaritySearchWithScore();
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
