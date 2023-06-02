import { Injectable } from '@nestjs/common';
import { SubjectDto } from './dto/subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectsService {
  public create(createSubjectDto: SubjectDto) {
    return 'This action adds a new subject';
  }

  public findAll() {
    return `This action returns all subjects`;
  }

  public findOne(id: number) {
    return `This action returns a #${id} subject`;
  }

  public update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return `This action updates a #${id} subject`;
  }

  public delete(id: number) {
    return `This action deletes a #${id} subject`;
  }
}
