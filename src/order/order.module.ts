import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { OrdersController } from './order.controller';
import { OrdersService } from './order.service';

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrderModule {}
