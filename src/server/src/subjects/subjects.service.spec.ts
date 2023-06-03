import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { SubjectsRepository } from './subjects.repository';
import { SubjectsService } from './subjects.service';

describe('SubjectsService', () => {
  let service: SubjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubjectsService, SubjectsRepository, PrismaService],
    }).compile();

    service = module.get<SubjectsService>(SubjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
