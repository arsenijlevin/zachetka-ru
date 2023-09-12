import { HttpException, Injectable } from '@nestjs/common';
import { AttendanceRepository } from './attendance.repository';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(private readonly attendanceRepository: AttendanceRepository) {}

  public async findAllForStudent(student_login: string, subject_id: number) {
    const attendance = await this.attendanceRepository.findAllForStudent(
      student_login,
      subject_id,
    );

    if (!attendance) {
      return new HttpException('Cannot find attendance. Wrong data', 400);
    }

    return attendance;
  }

  public async findAllForSubjectGroup(
    professor_login: string,
    subject_id: number,
    group_id: number,
  ) {
    const attendance = await this.attendanceRepository.findAllForSubjectGroup(
      professor_login,
      +subject_id,
      +group_id,
    );

    if (!attendance) {
      return new HttpException('Cannot find attendance. Wrong data', 400);
    }

    return attendance;
  }

  public async post(updateAttendanceDto: UpdateAttendanceDto) {
    const attendance = await this.attendanceRepository.upsert(
      updateAttendanceDto,
    );

    if (!attendance) {
      return new HttpException('Cannot post attendance. Wrong data', 400);
    }

    return attendance;
  }
}
