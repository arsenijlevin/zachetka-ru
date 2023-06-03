import { Test, TestingModule } from '@nestjs/testing';
import { StudentPerformanceService } from './student-performance.service';

describe('StudentPerformanceService', () => {
  let service: StudentPerformanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentPerformanceService],
    }).compile();

    service = module.get<StudentPerformanceService>(StudentPerformanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
