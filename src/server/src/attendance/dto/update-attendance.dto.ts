import { PartialType } from '@nestjs/mapped-types';
import { CreateAttendanceDto } from './attendance.dto';

export class UpdateAttendanceDto extends PartialType(CreateAttendanceDto) { }
