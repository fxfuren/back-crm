import { IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from 'prisma/__generated__';

export class CreateOrderDto {
  @IsString()
  customer: string;

  @IsString()
  device: string;

  @IsString()
  issue: string;

  @IsString()
  technicianId: string;

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;
}
