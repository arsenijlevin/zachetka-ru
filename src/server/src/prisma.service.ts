import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common'
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

  public async onModuleInit() {
    await this.$connect();
  }

  public enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  public exclude<T, Key extends keyof T>(
    user: T,
    keys: Key[]
  ): Omit<T, Key> {
    for (const key of keys) {
      delete user[key]
    }
    return user
  }
}