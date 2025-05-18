import {
    Controller,
    Post,
    Get,
    Body,
    Param, UseGuards,
} from '@nestjs/common';
import { SessionService } from './session.service';
import { StartSessionDto } from './dto/start-session.dto';
import { SubmitAnswerDto } from './dto/submit-answer.dto';
import {AuthGuard} from "@nestjs/passport";

@Controller('sessions')
export class SessionController {
    constructor(private readonly sessionService: SessionService) {}

    @Post('start')
    async start(@Body() dto: StartSessionDto) {
        return await this.sessionService.start(dto);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.sessionService.getById(id);
    }

    @Post('submit')
    async submitAnswer(@Body() dto: SubmitAnswerDto) {
        return await this.sessionService.submitAnswer(dto.sessionId, dto);
    }
}