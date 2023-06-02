import { IsNumber, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()

  login: string;
  @IsString()

  name: string;
  @IsString()

  password: string;
  @IsNumber()

  rights_id: number;
}
