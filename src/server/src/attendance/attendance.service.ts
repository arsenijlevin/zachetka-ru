import { Injectable } from '@nestjs/common';
import { AttendanceRepository } from './attendance.repository';
import { CreateAttendanceDto } from './dto/attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    private readonly attendanceRepository: AttendanceRepository
  ) { }

  public create(createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceRepository.create(createAttendanceDto)
  }

  public findAll() {
    return this.attendanceRepository.findAll();
  }

  public findOne(id: number) {
    return this.attendanceRepository.findOne(id);
  }

  public update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    return this.attendanceRepository.update(id, updateAttendanceDto)
  }

  public delete(id: number) {
    return this.attendanceRepository.delete(id);
  }
}
