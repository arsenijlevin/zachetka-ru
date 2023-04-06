import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getTest(): string {
    return 'Test';
  }

  postTest(): string {
    console.log('postTest');

    return 'postTest';
  }
}
