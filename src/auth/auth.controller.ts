import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Recaptcha } from '@nestlab/google-recaptcha';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Recaptcha()
  @Post('register')
  @HttpCode(HttpStatus.OK)
  public async register(
    @Req() req: Request,
    @Body() dto: RegisterDto,
    @Query('inviteToken') inviteToken: string,
  ) {
    return this.authService.register(req, dto, inviteToken);
  }

  @Recaptcha()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Req() req: Request, @Body() dto: LoginDto) {
    return this.authService.login(req, dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  public async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.logout(req, res);
  }
}
