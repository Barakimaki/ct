import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './session.entity';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { QuestionModule } from '../questions/question.module';
import { AnswerModule } from '../answers/answer.module';
import { QuestionService } from '../questions/question.service';
import { AnswerService } from '../answers/answer.service';
import { Question } from '../questions/question.entity';
import { Answer } from '../answers/answer.entity';
import { Test } from '../tests/test.entity';
import {Subject} from "../subjects/subject.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Session, Question, Answer, Test, Subject]),
    QuestionModule,
    AnswerModule,
  ],
  controllers: [SessionController],
  providers: [SessionService, QuestionService, AnswerService],
})
export class SessionModule {}
