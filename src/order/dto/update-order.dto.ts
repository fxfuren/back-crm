import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from 'prisma/__generated__';

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  customer?: string;

  @IsOptional()
  @IsString()
  device?: string;

  @IsOptional()
  @IsString()
  issue?: string;

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @IsOptional()
  @IsDate()
  completedAt?: Date;
}
