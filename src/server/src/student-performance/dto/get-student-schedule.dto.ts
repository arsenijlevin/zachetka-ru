import { IsString } from 'class-validator';

export class GetStudentScheduleDto {
  @IsString()
  start_date: string;

  @IsString()
  end_date: string;
}
