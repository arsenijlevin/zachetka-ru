import { ApiProperty } from '@nestjs/swagger/dist';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TestDataDto {
  @IsNumber()
  @ApiProperty()
  someNumber: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  someText: string;
}
