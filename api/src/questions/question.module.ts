import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { Test } from '../tests/test.entity';
import {TestModule} from "../tests/test.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Question, Test]),
        TestModule,
    ],
    controllers: [QuestionController],
    providers: [QuestionService],
    exports: [QuestionService],
})
export class QuestionModule {}