import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private questionRepo: Repository<Question>,
    ) {}

    async getAll(): Promise<Question[]> {
        return await this.questionRepo.find({ relations: ['test'] });
    }

    async getById(id: string): Promise<Question> {
        const question = await this.questionRepo.findOne({
            where: { id },
            relations: ['test', 'answers'],
        });
        if (!question) throw new Error(`Question with ID ${id} not found`);
        return question;
    }

    async getByTestId(testId: string): Promise<Question[]> {
        return await this.questionRepo.find({
            where: { testId },
            relations: ['test'],
        });
    }

    async create(dto: CreateQuestionDto): Promise<Question> {
        const question = this.questionRepo.create(dto);
        return await this.questionRepo.save(question);
    }

    async update(id: string, dto: UpdateQuestionDto): Promise<Question> {
        const question = await this.getById(id);
        Object.assign(question, dto);
        return await this.questionRepo.save(question);
    }

    async delete(id: string): Promise<void> {
        const result = await this.questionRepo.delete(id);
        if (result.affected === 0) {
            throw new Error(`Question with ID ${id} not found`);
        }
    }

    async getCountByTestId(testId: string): Promise<number> {
        return await this.questionRepo.count({ where: { testId } });
    }
}