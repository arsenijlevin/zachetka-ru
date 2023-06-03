import { IsNumber, IsOptional } from "class-validator";

export class FindAllStudentPerformanceDTO {
  @IsNumber()
  @IsOptional()
  skip?: number;

  @IsOptional()
  @IsNumber()
  take?: number;
}