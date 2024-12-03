import {
  IsDecimal,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateItemDto {
  @IsString({ message: 'Название должно быть строкой.' })
  name: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsUUID()
  warehouseId: string;

  @IsDecimal()
  @IsOptional()
  price?: string;
}
