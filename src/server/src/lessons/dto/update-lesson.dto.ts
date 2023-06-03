import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonDto } from './lesson.dto';

export class UpdateLessonDto extends PartialType(CreateLessonDto) { }
