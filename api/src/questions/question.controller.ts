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
import {AuthGuard} from "@nestjs/passport";

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  async getAll() {
    return await this.questionService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.questionService.getById(id);
  }

  @UseGuards(AuthGuard)
  @Get('test/:testId')
  async getByTestId(@Param('testId') testId: string) {
    return await this.questionService.getByTestId(testId);
  }

  @Post()
  async create(@Body() dto: CreateQuestionDto) {
    return await this.questionService.create(dto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateQuestionDto) {
    return await this.questionService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.questionService.delete(id);
  }
}
