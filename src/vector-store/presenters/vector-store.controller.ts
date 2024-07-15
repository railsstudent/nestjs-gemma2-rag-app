import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { VectorStoreService } from '~vector-store/application/vector-store.service';

@ApiTags('Vector Store')
@Controller('vector-store')
export class VectorStoreController {
  constructor(private service: VectorStoreService) {}

  @ApiResponse({
    description: 'Create a vector store',
    type: String,
    status: HttpStatus.OK,
  })
  @Get()
  async testVectorStore() {
    await this.service.createStore();
    return 'OK';
  }
}
