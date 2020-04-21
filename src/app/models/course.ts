import { Generic } from './generic';
import { Exam } from './exam';
import { Student } from './student';

export class Course implements Generic {
  id: number;
  name: string;
  createAt: string;
  students: Student[] = [];
  exams: Exam[] = [];
}
