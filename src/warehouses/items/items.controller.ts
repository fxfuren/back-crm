import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Authorization } from 'src/auth/decorators/auth.decorator';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemService: ItemsService) {}

  @Authorization()
  @HttpCode(HttpStatus.OK)
  @Get()
  public async getAllItems() {
    return this.itemService.getAllItems();
  }

  @Authorization()
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getItemById(@Param('id') id: string) {
    return this.itemService.getItemById(id);
  }

  @Authorization()
  @HttpCode(HttpStatus.OK)
  @Post('new')
  public async addItem(@Body() createItemDto: CreateItemDto) {
    return this.itemService.addItem(createItemDto);
  }

  @Authorization()
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  public async updateItem(
    @Param('id') id: string,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return this.itemService.updateItem(id, updateItemDto);
  }

  @Authorization()
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async deleteItem(@Param('id') id: string) {
    return this.itemService.deleteItem(id);
  }
}
