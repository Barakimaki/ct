import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import {Test} from "../tests/test.entity";

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private questionRepo: Repository<Question>,
        @InjectRepository(Test)
        private testRepo: Repository<Test>,
    ) {}

    async getAll(): Promise<Question[]> {
        return await this.questionRepo.find({ relations: ['test'] });
    }

    async getById(id: number): Promise<Question> {
        const question = await this.questionRepo.findOne({
            where: { id },
            relations: ['test', 'answers'],
        });
        if (!question) throw new Error(`Question with ID ${id} not found`);
        return question;
    }

    async getByTestId(testId: number): Promise<Question[]> {
        return await this.questionRepo.find({
            where: { testId },
            relations: ['test'],
        });
    }

    async create(dto: CreateQuestionDto): Promise<Question> {
        const test = await this.testRepo.findOneBy({ id: dto.testId });
        if (!test) throw new Error(`Test with ID ${dto.testId} not found`);

        const question = this.questionRepo.create({
            ...dto,
            test,
        });

        return await this.questionRepo.save(question);
    }

    async update(id: number, dto: UpdateQuestionDto): Promise<Question> {
        const question = await this.getById(id);
        Object.assign(question, dto);
        return await this.questionRepo.save(question);
    }

    async delete(id: number): Promise<void> {
        const result = await this.questionRepo.delete(id);
        if (result.affected === 0) {
            throw new Error(`Question with ID ${id} not found`);
        }
    }

    async getCountByTestId(testId: number): Promise<number> {
        return await this.questionRepo.count({ where: { testId } });
    }
}