import { Test, TestingModule } from '@nestjs/testing';
import { StudentPerformanceController } from './student-performance.controller';
import { StudentPerformanceService } from './student-performance.service';

describe('StudentPerformanceController', () => {
  let controller: StudentPerformanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentPerformanceController],
      providers: [StudentPerformanceService],
    }).compile();

    controller = module.get<StudentPerformanceController>(StudentPerformanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
