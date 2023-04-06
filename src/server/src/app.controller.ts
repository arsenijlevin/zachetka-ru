import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/test')
  getTest(): string {
    return this.appService.getTest();
  }

  @Post('/test')
  postTest(): string {
    return this.appService.postTest();
  }
}
