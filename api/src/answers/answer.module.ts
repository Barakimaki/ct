import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './answer.entity';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { Session } from '../sessions/session.entity';
import { Question } from '../questions/question.entity';
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Answer, Session, Question]),
        AuthModule,
    ],
    controllers: [AnswerController],
    providers: [AnswerService],
})
export class AnswerModule {}