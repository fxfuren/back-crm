import { Module } from '@nestjs/common';
import { UserSevice } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserSevice],
})
export class AuthModule {}
