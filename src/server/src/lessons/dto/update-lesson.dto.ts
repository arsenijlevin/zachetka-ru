import { PartialType } from '@nestjs/mapped-types';
import { LessonDto } from './lesson.dto';

export class UpdateLessonDto extends PartialType(LessonDto) {}
