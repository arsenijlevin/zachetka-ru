import { IsString, IsNumber, Min, IsOptional } from 'class-validator';

export class LessonDto {
  @IsNumber()
  @Min(0)
  @IsOptional()
  id?: number;

  @IsNumber({}, { each: true })
  groups_id: number[];

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
  frequency: string;

  @IsString()
  professor_login: string;
}
