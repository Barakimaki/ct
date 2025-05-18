import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { SubjectModule } from './subjects/subject.module';
import { TestModule } from './tests/test.module';
import { QuestionModule } from './questions/question.module';
import { SessionModule } from './sessions/session.module';
import { AnswerModule } from './answers/answer.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    SubjectModule,
    TestModule,
    QuestionModule,
    SessionModule,
    AnswerModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
