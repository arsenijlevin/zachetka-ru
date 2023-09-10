import { Test, TestingModule } from '@nestjs/testing';
import { moduleSettings } from './app.module';
import { UsersModule } from './users/users.module';

describe('AppController', () => {
  let usersModule: UsersModule;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule(
      moduleSettings,
    ).compile();

    usersModule = app.get<UsersModule>(UsersModule);
  });

  describe('root', () => {
    it('app controller is defined', () => {
      expect(usersModule).toBeDefined();
    });
  });
});
