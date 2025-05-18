import {
    Controller,
    Post,
    Get,
    Body,
    Param,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Controller('answers')
export class AnswerController {
    constructor(private readonly answerService: AnswerService) {}

    @Post()
    async create(@Body() dto: CreateAnswerDto) {
        return await this.answerService.create(dto);
    }

    @Get('session/:sessionId')
    async getBySessionId(@Param('sessionId') sessionId: string) {
        return await this.answerService.getBySessionId(sessionId);
    }
}