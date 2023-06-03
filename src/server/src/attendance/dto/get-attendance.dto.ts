import { IsDateString, IsNumber, IsString } from "class-validator"

export class GetAttendanceDto {
  @IsNumber()
  subject_id: number;

  @IsString()
  time: string;

  @IsString()
  student_login: string;

  @IsString()
  status: string;

  @IsDateString()
  date: string;
}
