import { IsInt, IsNumber, IsString, Max, Min } from "class-validator";

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
  point1: number;

  @IsNumber()
  @Min(0)
  @Max(50)
  @IsInt()
  point2: number;

  @IsNumber()
  @Min(0)
  @Max(50)
  @IsInt()
  point3: number;

  @IsNumber()
  @Min(0)
  @Max(50)
  @IsInt()
  exam_mark: number;
}
