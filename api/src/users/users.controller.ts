import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me/results')
  @UseGuards(AuthGuard)
  async getMyResults(@Req() req) {
    return await this.usersService.getUserResults(req.user.id);
  }
}
