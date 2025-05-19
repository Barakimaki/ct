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
import {AuthGuard} from "../common/auth.guard";

@Controller('sessions')
export class SessionController {
    constructor(private readonly sessionService: SessionService) {}

    @UseGuards(AuthGuard)
    @Post('start')
    async start(@Body() dto: StartSessionDto) {
        return await this.sessionService.start(dto);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getById(@Param('id') id: number) {
        return await this.sessionService.getById(id);
    }

    @UseGuards(AuthGuard)
    @Post('submit')
    async submitAnswer(@Body() dto: SubmitAnswerDto) {
        return await this.sessionService.submitAnswer(dto.sessionId, dto);
    }

    @UseGuards(AuthGuard)
    @Get(':id/results')
    async getResults(@Param('id') sessionId: number) {
        return await this.sessionService.getResults(sessionId);
    }
}