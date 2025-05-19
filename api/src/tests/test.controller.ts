import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body, UseGuards,
} from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import {AuthGuard} from "../common/auth.guard";

@Controller('tests')
export class TestController {
    constructor(private readonly testService: TestService) {}

    @UseGuards(AuthGuard)
    @Get()
    async getAll() {
        return await this.testService.getAll();
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.testService.getById(id);
    }

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() dto: CreateTestDto) {
        return await this.testService.create(dto);
    }

    @UseGuards(AuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() dto: UpdateTestDto) {
        return await this.testService.update(id, dto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.testService.delete(id);
    }
}