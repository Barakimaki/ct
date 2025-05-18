import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Session } from '../sessions/session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Session])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
