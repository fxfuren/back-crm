import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAllOrders() {
    return await this.prismaService.order.findMany({
      include: { technician: true },
    });
  }

  public async getOrderById(id: string) {
    const order = await this.prismaService.order.findUnique({
      where: { id },
      include: { technician: true },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  public async addOrder(createOrderDto: CreateOrderDto) {
    const { customer, device, issue, technicianId, status, price } =
      createOrderDto;

    const technicianExists = await this.prismaService.user.findUnique({
      where: { id: technicianId },
    });

    if (!technicianExists) {
      throw new BadRequestException('Technician not found');
    }

    return await this.prismaService.order.create({
      data: {
        customer,
        device,
        issue,
        price,
        technician: { connect: { id: technicianId } },
        status,
        completedAt: null,
      },
    });
  }

  public async updateOrder(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.getOrderById(id);
    return await this.prismaService.order.update({
      where: { id: order.id },
      data: updateOrderDto,
    });
  }

  public async deleteOrder(id: string) {
    const order = await this.getOrderById(id);
    return await this.prismaService.order.delete({
      where: { id: order.id },
    });
  }
}
