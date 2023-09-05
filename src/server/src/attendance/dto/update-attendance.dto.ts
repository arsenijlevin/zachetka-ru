import { PartialType } from '@nestjs/mapped-types';
import { PostAttendanceDto } from './post-attendance.dto';

export class UpdateAttendanceDto extends PartialType(PostAttendanceDto) {}
