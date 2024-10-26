import { Module } from '@nestjs/common';

import { MailService } from 'src/libs/mail/mail.service';
import { UserService } from 'src/user/user.service';

import { PasswordRecoveryController } from './password-recovery.controller';
import { PasswordRecoveryService } from './password-recovery.service';

@Module({
  controllers: [PasswordRecoveryController],
  providers: [PasswordRecoveryService, UserService, MailService],
})
export class PasswordRecoveryModule {}
