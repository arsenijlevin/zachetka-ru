import { Injectable } from '@nestjs/common';
import { TestDataDto } from './dto/TestDataDTO';

@Injectable()
export class TestingService {
  public getTest(): string {
    return 'Test.....';
  }

  public postTest(): string {
    console.log('postTest');

    return 'postTest';
  }

  public postTestWithData(body: TestDataDto) {
    console.log(`body.someNumber -> ${body.someNumber}`);
    console.log(`body.someText -> ${body.someText}`);
  }
}
