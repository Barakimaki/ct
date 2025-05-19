import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './subject.entity';
import {CreateSubjectDto} from "./dto/create-subject.dto";

@Injectable()
export class SubjectService {
    constructor(
        @InjectRepository(Subject)
        private subjectRepo: Repository<Subject>,
    ) {}

    getAll() {
        return this.subjectRepo.find();
    }

    async create(dto: CreateSubjectDto): Promise<Subject> {
        const subject = this.subjectRepo.create(dto);
        return await this.subjectRepo.save(subject);
    }

    async remove(id: string): Promise<void> {
        await this.subjectRepo.delete(id);
    }
}