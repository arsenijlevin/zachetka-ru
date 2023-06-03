import { Test, TestingModule } from '@nestjs/testing';
import { moduleSettings } from './testing.module';
import { TestingController } from './testing.controller';

describe('TestingController', () => {
  let controller: TestingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(moduleSettings).compile();

    controller = module.get<TestingController>(TestingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
