import { Test, TestingModule } from '@nestjs/testing';
import { moduleSettings } from './groups.module';
import { GroupsController } from './groups.controller';

describe('GroupsController', () => {
  let controller: GroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      moduleSettings,
    ).compile();

    controller = module.get<GroupsController>(GroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
