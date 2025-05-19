import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body, UseGuards,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import {AuthGuard} from "../common/auth.guard";

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAll() {
    return await this.questionService.getAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getById(@Param('id') id: number) {
    return await this.questionService.getById(id);
  }

  @UseGuards(AuthGuard)
  @Get('test/:testId')
  async getByTestId(@Param('testId') testId: number) {
    return await this.questionService.getByTestId(testId);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() dto: CreateQuestionDto) {
    return await this.questionService.create(dto);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateQuestionDto) {
    return await this.questionService.update(id, dto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.questionService.delete(id);
  }
}
