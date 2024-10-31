import { IsInt, IsString, IsUUID, Min } from 'class-validator';

export class CreateItemDto {
  @IsString({ message: 'Название должно быть строкой.' })
  name: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsUUID()
  warehouseId: string;
}
