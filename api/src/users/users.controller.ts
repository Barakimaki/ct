import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import {AuthGuard} from "../common/auth.guard";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('me/results')
  async getMyResults(@Req() req) {
    return await this.usersService.getUserResults(req.user.id);
  }
}
