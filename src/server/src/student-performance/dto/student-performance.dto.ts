import { IsInt, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class StudentPerformanceDto {
  @IsString()
  student_login: string;

  @IsNumber()
  @Min(0)
  subject_id: number;

  @IsNumber()
  @Min(0)
  @Max(50)
  @IsInt()
  @IsOptional()
  point1?: number;

  @IsNumber()
  @Min(0)
  @Max(50)
  @IsInt()
  @IsOptional()
  point2?: number;

  @IsNumber()
  @Min(0)
  @Max(50)
  @IsInt()
  @IsOptional()
  point3?: number;

  @IsNumber()
  @Min(0)
  @Max(50)
  @IsInt()
  @IsOptional()
  exam_mark?: number;
}
