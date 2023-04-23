import { Injectable } from '@nestjs/common';
import { TestDataDto } from './dto/TestDataDTO';

@Injectable()
export class TestingService {
  getTest(): string {
    return 'Test.....';
  }

  postTest(): string {
    console.log('postTest');

    return 'postTest';
  }

  postTestWithData(body: TestDataDto) {
    console.log(`body.someNumber -> ${body.someNumber}`);
    console.log(`body.someText -> ${body.someText}`);
  }
}
