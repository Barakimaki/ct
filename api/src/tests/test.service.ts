import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from './test.entity';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';

@Injectable()
export class TestService {
    constructor(
        @InjectRepository(Test)
        private testRepo: Repository<Test>,
    ) {}

    async getAll(): Promise<Test[]> {
        return await this.testRepo.find({ relations: ['subject'] });
    }

    async getById(id: string): Promise<Test> {
        const test = await this.testRepo.findOne({
            where: { id },
            relations: ['subject', 'questions'],
        });
        if (!test) throw new Error(`Test with ID ${id} not found`);
        return test;
    }

    async create(dto: CreateTestDto): Promise<Test> {
        const test = this.testRepo.create(dto);
        return await this.testRepo.save(test);
    }

    async update(id: string, dto: UpdateTestDto): Promise<Test> {
        const test = await this.getById(id);
        Object.assign(test, dto);
        return await this.testRepo.save(test);
    }

    async delete(id: string): Promise<void> {
        const result = await this.testRepo.delete(id);
        if (result.affected === 0) {
            throw new Error(`Test with ID ${id} not found`);
        }
    }
}