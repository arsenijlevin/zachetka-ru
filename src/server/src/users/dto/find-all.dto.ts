import { IsNumber, IsOptional } from 'class-validator';

export class FindAllUsersDTO {
  @IsNumber()
  @IsOptional()
  skip?: number;

  @IsOptional()
  @IsNumber()
  take?: number;
}
