import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
