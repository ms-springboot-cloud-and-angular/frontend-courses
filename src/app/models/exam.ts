import { Generic } from './generic';
import { Subject } from './subject';
import { Question } from './question';

export class Exam implements Generic {
  id: number;
  name: string;
  createAt: string;
  questions: Question[] = [];
  subject: Subject;
  answered: boolean;
}
