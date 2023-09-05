import { OmitType, PartialType } from '@nestjs/swagger';
import { StudentPerformanceDto } from './student-performance.dto';

export class UpdateStudentPerformanceDto extends OmitType(
  PartialType(StudentPerformanceDto),
  ['subject_id', 'student_login'],
) {}
