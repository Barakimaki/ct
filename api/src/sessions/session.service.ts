import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './session.entity';
import { StartSessionDto } from './dto/start-session.dto';
import { QuestionService } from '../questions/question.service';
import { AnswerService } from '../answers/answer.service';
import { SubmitAnswerDto } from './dto/submit-answer.dto';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private sessionRepo: Repository<Session>,
    private questionService: QuestionService,
    private answerService: AnswerService,
  ) {}

  async start(dto: StartSessionDto): Promise<Session> {
    const session = this.sessionRepo.create({
      user: { id: dto.userId },
      test: { id: dto.testId },
      totalQuestions: await this.questionService.getCountByTestId(dto.testId),
    });
    return await this.sessionRepo.save(session);
  }

  async getById(id: number): Promise<Session> {
    const session = await this.sessionRepo.findOne({
      where: { id },
      relations: ['user', 'test', 'answers'],
    });
    if (!session) throw new Error(`Session with ID ${id} not found`);
    return session;
  }

  async submitAnswer(
    sessionId: number,
    dto: SubmitAnswerDto,
  ): Promise<{ isCorrect: boolean }> {
    const session = await this.getById(sessionId);
    const question = await this.questionService.getById(dto.questionId);

    const isCorrect = this.checkAnswers(question, dto.selectedAnswers);

    // Сохраняем ответ
    const answer = await this.answerService.create({
      sessionId,
      questionId: question.id,
      selectedAnswers: dto.selectedAnswers,
      isCorrect,
    });

    // Обновляем статистику сессии
    session.answers.push(answer);
    if (isCorrect) session.correctAnswersCount++;
    if (session.answers.length === session.totalQuestions) {
      session.isFinished = true;
      session.finishedAt = new Date();
    }

    await this.sessionRepo.save(session);

    return { isCorrect };
  }

  private checkAnswers(question: any, selectedAnswers: string[]): boolean {
    if (question.type === 'single') {
      return question.correctAnswers[0] === selectedAnswers[0];
    } else if (question.type === 'multiple') {
      return (
        JSON.stringify([...selectedAnswers].sort()) ===
        JSON.stringify([...question.correctAnswers].sort())
      );
    }
    return false; // open-ended не проверяем автоматически
  }

  async getResults(sessionId: number) {
    const session = await this.sessionRepo.findOne({
      where: { id: sessionId },
      relations: ['test', 'test.questions', 'answers'],
    });

    if (!session) throw new NotFoundException(`Сессия ${sessionId} не найдена`);

    return {
      sessionId: session.id,
      testName: session.test?.title || 'Неизвестный тест',
      subject: session.test?.subject?.name || 'Неизвестный предмет',
      totalQuestions: session.totalQuestions,
      correctAnswers: session.correctAnswersCount,
      percentage: Math.round(
        (session.correctAnswersCount / session.totalQuestions) * 100,
      ),
      completedAt: session.finishedAt || new Date(),
      questions: session.answers.map((answer) => {
        const question = answer.questionId
          ? session.test?.questions.find((q) => q.id === answer.questionId)
          : undefined;

        return {
          questionId: answer.questionId,
          text: question?.text || 'Вопрос не найден',
          options: question?.options || [],
          correctAnswers: typeof question.correctAnswers === 'string'
              ? [question.correctAnswers]
              : question.correctAnswers,
          selectedAnswers: answer.selectedAnswers,
          isCorrect: answer.isCorrect,
          explanation: question?.explanation || 'Нет объяснения',
        };
      }),
    };
  }
}
