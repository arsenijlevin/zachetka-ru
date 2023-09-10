import { OmitType, PartialType } from '@nestjs/swagger';
import { SubjectDto } from './subject.dto';

export class UpdateSubjectDto extends OmitType(PartialType(SubjectDto), [
  'id',
]) {}
