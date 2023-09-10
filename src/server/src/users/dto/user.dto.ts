import { IsString, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  @MinLength(4)
  login: string;

  @IsString()
  name: string;

  @IsString()
  rights_id: number;
}

export class UserUnsafeDto extends UserDto {
  @IsString()
  @MinLength(4)
  password: string;
}
