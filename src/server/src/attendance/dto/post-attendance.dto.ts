import { IsDateString, IsNumber, IsString } from "class-validator"

export class PostAttendanceDto {
  @IsNumber()
  lesson_id: number;

  @IsString()
  student_login: string;

  @IsString()
  status: string;

  @IsDateString()
  date: string;
}
