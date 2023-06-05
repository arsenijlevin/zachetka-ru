import { IsString } from "class-validator";

export class ChangePasswordDto {
  @IsString()
  login: string;

  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;
}