import { Test, TestingModule } from '@nestjs/testing';
import { LessonsRepository } from './lessons.repository';
import { PrismaService } from '../prisma.service';
import { LessonsService } from './lessons.service';

describe('LessonsService', () => {
  let service: LessonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LessonsService, PrismaService, LessonsRepository],
    }).compile();

    service = module.get<LessonsService>(LessonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
