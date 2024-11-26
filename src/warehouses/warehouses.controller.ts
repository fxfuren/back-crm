import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { Authorization } from 'src/auth/decorators/auth.decorator';
import { WarehousesService } from './warehouses.service';

@Controller('warehouses')
export class WarehousesController {
  constructor(private readonly warehousesService: WarehousesService) {}

  @Authorization()
  @HttpCode(HttpStatus.OK)
  @Get('one')
  public async getFirstWarehouse() {
    return this.warehousesService.getFirstWarehouse();
  }
}
