import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestingModule } from './testing/testing.module';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [TestingModule, StudentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
