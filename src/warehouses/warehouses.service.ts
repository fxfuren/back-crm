import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WarehousesService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getFirstWarehouse() {
    const warehouses = await this.prismaService.warehouse.findMany({
      take: 1,
    });
    return warehouses[0];
  }
}
