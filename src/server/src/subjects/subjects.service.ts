import { HttpException, Injectable } from '@nestjs/common';
import { SubjectsRepository } from './subjects.repository';
import { SubjectDto } from './dto/subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(private readonly subjectsRepository: SubjectsRepository) {}

  public async create(createSubjectDto: SubjectDto) {
    const newSubject = await this.subjectsRepository.save(createSubjectDto);

    if (!newSubject) {
      throw new HttpException(
        'Cannot create subject with this parameters',
        400,
      );
    }

    return newSubject;
  }

  public async findAllForProfessor(professor_login: string) {
    const subjects = await this.subjectsRepository.findAllForProfessor(
      professor_login,
    );

    if (!subjects) {
      throw new HttpException(
        'Cannot find subjects for this professor_login',
        400,
      );
    }

    return subjects;
  }

  public async findOne(id: number) {
    const subject = await this.subjectsRepository.findOne(id);

    if (!subject) {
      throw new HttpException('Subject not found', 404);
    }

    return subject;
  }

  public async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    const updatedSubject = await this.subjectsRepository.update(
      id,
      updateSubjectDto,
    );

    if (!updatedSubject) {
      throw new HttpException('Subject not found', 404);
    }

    return updatedSubject;
  }

  public async delete(id: number) {
    const deletedSubject = await this.subjectsRepository.delete(id);

    if (!deletedSubject) {
      throw new HttpException('Subject not found', 404);
    }

    return deletedSubject;
  }
}
