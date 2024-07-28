import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RagService } from '~rag-tech-book/application/rag.service';
import { toDivRow } from '~rag-tech-book/formatters/response.-formatter';
import { AskDto } from '../dtos/ask.dto';

@ApiTags('RAG')
@Controller('rag')
export class RagController {
  constructor(private service: RagService) {}

  @ApiBody({
    description: 'An intance of AskDto',
    required: true,
    schema: {
      type: 'object',
      properties: {
        Query: {
          type: 'string',
          description: 'query',
        },
      },
    },
    examples: {
      routeInputData: {
        value: {
          query: 'Please explain route data input bindings that is registered via withComponentInputBinding.',
        },
      },
      newControlFlow: {
        value: {
          query: 'What is the new control flow?',
        },
      },
    },
  })
  @ApiResponse({
    description: 'Generate answer in a rag aplication about technology book',
    type: String,
    status: HttpStatus.CREATED,
  })
  @Post()
  async ask(@Body() dto: AskDto): Promise<string> {
    const conversation = await this.service.ask(dto.query);
    return toDivRow(conversation);
  }
}
