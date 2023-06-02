import { PartialType } from '@nestjs/swagger';
import { SubjectDto } from './subject.dto';

export class UpdateSubjectDto extends PartialType(SubjectDto) { }
