import { IsNumber, IsString } from 'class-validator';

export class PostAttendanceDto {
  @IsString()
  student_login: string;

  @IsString()
  status: string;

  @IsString()
  time: string;

  date: string;

  @IsString()
  week_day: string;

  @IsNumber()
  subject_id: number;

  @IsString()
  frequency: string;

  @IsString()
  professor_login: string;
}
