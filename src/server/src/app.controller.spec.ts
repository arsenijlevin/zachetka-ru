import { Test, TestingModule } from '@nestjs/testing';
import { moduleSettings } from './app.module';
import { UsersModule } from './users/users.module';
import { TestingModule as TestModule } from "./testing/testing.module";

describe('AppController', () => {
  let usersModule: UsersModule;
  let testModule: TestModule;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule(moduleSettings).compile();

    usersModule = app.get<UsersModule>(UsersModule);
    testModule = app.get<TestModule>(TestModule);
  });

  describe('root', () => {
    it('app controller is defined', () => {
      expect(usersModule).toBeDefined();
      expect(testModule).toBeDefined();
    });
  });
});
