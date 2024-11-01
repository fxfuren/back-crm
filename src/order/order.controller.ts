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
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './order.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Authorization()
  @HttpCode(HttpStatus.OK)
  @Get()
  public async getAllOrders() {
    return this.ordersService.getAllOrders();
  }

  @Authorization()
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getOrderById(@Param('id') id: string) {
    return this.ordersService.getOrderById(id);
  }

  @Authorization()
  @HttpCode(HttpStatus.OK)
  @Post('new')
  public async addOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.addOrder(createOrderDto);
  }

  @Authorization()
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  public async updateOrder(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.updateOrder(id, updateOrderDto);
  }

  @Authorization()
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async deleteOrder(@Param('id') id: string) {
    return this.ordersService.deleteOrder(id);
  }
}
