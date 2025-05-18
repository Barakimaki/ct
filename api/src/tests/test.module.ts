import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './test.entity';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { Subject } from '../subjects/subject.entity';
import { Question } from '../questions/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Test, Subject, Question])],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
