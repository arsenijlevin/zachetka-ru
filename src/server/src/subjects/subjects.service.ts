import { HttpException, Injectable } from '@nestjs/common';
import { SubjectsRepository } from './subjects.repository';
import { SubjectDto } from './dto/subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { FindAllSubjectsDTO } from '@src/subjects/dto/find-all.dto';

@Injectable()
export class SubjectsService {
  constructor(private readonly subjectsRepository: SubjectsRepository) { }

  public async create(createSubjectDto: SubjectDto) {
    return await this.subjectsRepository.save(createSubjectDto);
  }

  public async findAll(findAllSubjectsDTO: FindAllSubjectsDTO) {
    return await this.subjectsRepository.findAll(findAllSubjectsDTO);
  }

  public async findOne(id: number) {
    const subject = await this.subjectsRepository.findOne(id);

    if (!subject) {
      throw new HttpException('Subject not found', 404);
    }

    return subject;
  }

  public async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    const updatedSubject = await this.subjectsRepository.update(id, updateSubjectDto);

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
