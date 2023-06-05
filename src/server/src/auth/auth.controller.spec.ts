import { Test, TestingModule } from '@nestjs/testing';
import { moduleSettings } from './auth.module';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(moduleSettings).compile();

    controller = module.get<AuthController>(AuthController);


  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
