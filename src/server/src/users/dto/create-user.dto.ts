import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  login: string;
  @IsString()
  @ApiProperty()
  name: string;
  @IsString()
  @ApiProperty()
  password: string;
  @IsNumber()
  @ApiProperty()
  rights_id: number;
}
