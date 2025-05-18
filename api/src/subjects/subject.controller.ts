import { Controller, Get } from '@nestjs/common';
import { SubjectService } from './subject.service';

@Controller('subjects')
export class SubjectController {
    constructor(private readonly subjectService: SubjectService) {}

    @Get()
    getAll() {
        return this.subjectService.getAll();
    }
}