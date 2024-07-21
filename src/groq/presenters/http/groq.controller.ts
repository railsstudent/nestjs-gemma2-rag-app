import { MessageContent } from '@langchain/core/messages';
import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GroqService } from '~groq/application/groq.service';

@ApiTags('Groq chain')
@Controller('groq')
export class GroqController {
  constructor(private service: GroqService) {}

  @ApiResponse({
    description: 'The AI message of Groq Chat Model',
    type: String,
    status: HttpStatus.OK,
  })
  @Get()
  testChain(): Promise<MessageContent> {
    return this.service.generateText('What is Agentic RAG?');
  }
}
