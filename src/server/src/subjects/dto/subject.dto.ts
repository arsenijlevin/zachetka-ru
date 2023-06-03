import { IsString, IsNumber, Min } from "class-validator";

export class SubjectDto {
  id: number;

  @IsString()
  title: string;

  @IsNumber()
  @Min(0)
  semester: number;

  @IsString()
  reporting_type: string
}
