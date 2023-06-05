import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TestDataDto {
  @IsNumber()
  someNumber: number;

  @IsNotEmpty()
  @IsString()
  someText: string;
}
