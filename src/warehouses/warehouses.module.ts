import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { WarehousesController } from './warehouses.controller';
import { WarehousesService } from './warehouses.service';

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [WarehousesController],
  providers: [WarehousesService],
})
export class WarehousesModule {}
