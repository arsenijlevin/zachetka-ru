import { IsDate, IsNumber, IsString } from "class-validator"

export class CreateAttendanceDto {
  @IsNumber()
  lesson_id: number;

  @IsString()
  student_login: number;

  @IsString()
  status: string;

  @IsDate()
  date: Date;
}
