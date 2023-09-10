import { IsNumber, IsOptional } from 'class-validator';

export class FindAllGroupsDTO {
  @IsNumber()
  @IsOptional()
  skip?: number;

  @IsOptional()
  @IsNumber()
  take?: number;
}
