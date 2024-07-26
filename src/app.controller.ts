import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  getHello(): Record<string, string> {
    return {
      title: 'Angular Tech Book RAG',
    };
  }
}
