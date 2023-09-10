import { IsNumber, IsOptional } from 'class-validator';

export class FindAllSubjectsDTO {
  @IsNumber()
  @IsOptional()
  skip?: number;

  @IsOptional()
  @IsNumber()
  take?: number;
}
