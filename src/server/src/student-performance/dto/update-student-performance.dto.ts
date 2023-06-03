import { PartialType } from '@nestjs/swagger';
import { StudentPerformanceDto } from './student-performance.dto';

export class UpdateStudentPerformanceDto extends PartialType(StudentPerformanceDto) { }
