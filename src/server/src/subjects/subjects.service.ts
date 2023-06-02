import { Injectable } from '@nestjs/common';
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
    return await this.subjectsRepository.findOne(id);
  }

  public async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return await this.subjectsRepository.update(id, updateSubjectDto);
  }

  public async delete(id: number) {
    return await this.subjectsRepository.delete(id);
  }
}
