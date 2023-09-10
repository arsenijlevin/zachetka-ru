import { Test, TestingModule } from '@nestjs/testing';
import { moduleSettings } from './lessons.module';
import { LessonsController } from './lessons.controller';

describe('LessonsController', () => {
  let controller: LessonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      moduleSettings,
    ).compile();

    controller = module.get<LessonsController>(LessonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
