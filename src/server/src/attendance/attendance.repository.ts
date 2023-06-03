import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendanceRepository {
  public create(createAttendanceDto: CreateAttendanceDto) {
    return 'This action adds a new attendance';
  }

  public findAll() {
    return `This action returns all attendance`;
  }

  public findOne(id: number) {
    return `This action returns a #${id} attendance`;
  }

  public update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    return `This action updates a #${id} attendance`;
  }

  public delete(id: number) {
    return `This action removes a #${id} attendance`;
  }
}
