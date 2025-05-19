import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './answer.entity';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Injectable()
export class AnswerService {
    constructor(
        @InjectRepository(Answer)
        private answerRepo: Repository<Answer>,
    ) {}

    async create(dto: CreateAnswerDto): Promise<Answer> {
        const answer = this.answerRepo.create(dto);
        return await this.answerRepo.save(answer);
    }

    async getBySessionId(sessionId: number): Promise<Answer[]> {
        return await this.answerRepo.find({
            where: { sessionId },
            relations: ['question'],
        });
    }
}