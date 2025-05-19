import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { AuthGuard } from '../common/auth.guard';
import { CreateSubjectDto } from './dto/create-subject.dto';

@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAll() {
    return this.subjectService.getAll();
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() dto: CreateSubjectDto) {
    return await this.subjectService.create(dto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.subjectService.remove(id);
  }
}
