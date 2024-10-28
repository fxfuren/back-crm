import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UserRole } from 'prisma/__generated__';
import { Authorization } from 'src/auth/decorators/auth.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Authorization()
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  public async findProfile(@Authorized('id') userId: string) {
    return this.userService.findById(userId);
  }

  @Authorization(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Get('by-id/:id')
  public async findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Authorization()
  @HttpCode(HttpStatus.OK)
  @Get('')
  public async allUser() {
    return this.userService.allUser();
  }

  @Authorization(UserRole.ADMIN)
  @Post('new')
  @HttpCode(HttpStatus.OK)
  public async genInvite(@Authorized('email') adminEmail: string) {
    return this.userService.genInvite(adminEmail);
  }

  @Authorization(UserRole.ADMIN)
  @Post(':id/role')
  @HttpCode(HttpStatus.OK)
  public async updateRole(
    @Authorized('id') requesterId: string,
    @Param('id') id: string,
    @Body('role') role: UserRole,
  ) {
    return this.userService.updateRole(requesterId, id, role);
  }
}
