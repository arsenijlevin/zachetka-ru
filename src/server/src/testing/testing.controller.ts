import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TestDataDto } from './dto/TestDataDTO';
import { TestingService } from './testing.service';

@Controller('testing')
@ApiTags('Тестовые запросы')
export class TestingController {
  constructor(private readonly testingService: TestingService) {}

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
