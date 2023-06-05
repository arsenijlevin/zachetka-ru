import { IsString, IsNumber, Min } from "class-validator";

export class SubjectDto {
  id: number;

  @IsString()
  title: string;

  @IsString({ each: true })
  professors_login: string[];

  @IsNumber({}, { each: true })
  groups_id: number[];

  @IsNumber()
  @Min(0)
  semester: number;

  @IsString()
  reporting_type: string
}
