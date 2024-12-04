import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAllItems() {
    return await this.prismaService.item.findMany({
      include: { warehouse: true },
    });
  }

  public async getItemById(id: string) {
    const item = await this.prismaService.item.findUnique({
      where: { id },
      include: { warehouse: true },
    });

    if (!item) {
      throw new NotFoundException('Item not found');
    }
    return item;
  }

  public async addItem(createItemDto: CreateItemDto) {
    return await this.prismaService.item.create({
      data: createItemDto,
    });
  }

  public async updateItem(id: string, updateItemDto: UpdateItemDto) {
    const item = await this.getItemById(id);
    return await this.prismaService.item.update({
      where: { id: item.id },
      data: updateItemDto,
    });
  }

  public async deleteItem(id: string) {
    const item = await this.getItemById(id);

    return await this.prismaService.item.delete({
      where: { id: item.id },
    });
  }
}
