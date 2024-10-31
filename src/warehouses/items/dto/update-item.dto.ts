import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateItemDto {
  @IsString({ message: 'Название должно быть строкой.' })
  @IsOptional()
  name?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  quantity?: number;
}
