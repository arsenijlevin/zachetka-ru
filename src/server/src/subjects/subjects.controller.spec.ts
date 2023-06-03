import { Test, TestingModule } from '@nestjs/testing';
import { moduleSettings } from './subjects.module';
import { SubjectsController } from './subjects.controller';

describe('SubjectsController', () => {
  let controller: SubjectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(moduleSettings).compile();

    controller = module.get<SubjectsController>(SubjectsController);


  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
