import { Body, Controller, Get, Post } from '@nestjs/common';
import { TestDataDto } from './dto/TestDataDTO';
import { TestingService } from './testing.service';

@Controller('testing')
export class TestingController {
  constructor(private readonly testingService: TestingService) { }

  @Get('/test')
  public getTest(): string {
    return this.testingService.getTest();
  }

  @Post('/test')
  public postTest(): string {
    return this.testingService.postTest();
  }

  @Post('/test-post-with-data')
  public postTestWithData(@Body() body: TestDataDto) {
    this.testingService.postTestWithData(body);
  }
}
