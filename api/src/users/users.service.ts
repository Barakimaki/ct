import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) {}

    async getUserResults(userId: number) {
        const user = await this.userRepo.findOne({
            where: { id: userId },
            relations: ['sessions', 'sessions.test', 'sessions.test.subject'],
        });

        return user.sessions.map((session) => ({
            sessionId: session.id,
            testId: session.test?.id || -1,
            testName: session.test?.title || 'Без названия', // <-- поменял на title
            subject: session.test?.subject?.name || 'Неизвестный предмет',
            totalQuestions: session.totalQuestions,
            correctAnswers: session.correctAnswersCount,
            percentage: Math.round((session.correctAnswersCount / session.totalQuestions) * 100),
            completedAt: session.finishedAt,
        }));
    }
}