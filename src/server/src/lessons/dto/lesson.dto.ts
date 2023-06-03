import { IsString, IsNumber, Min } from "class-validator";

export class LessonDto {
  @IsNumber()
  @Min(0)
  id: number;

  @IsNumber()
  @Min(0)
  group_id: number;

  @IsString()
  week_day: string;

  @IsString()
  time: string;

  @IsNumber()
  @Min(0)
  subject_id: number;

  @IsString()
  place: string;

  @IsString()
  frequency: string
}
