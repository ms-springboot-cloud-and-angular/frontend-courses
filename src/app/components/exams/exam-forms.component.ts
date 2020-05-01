import Swal from 'sweetalert2'
import { Subject } from './../../models/subject';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ExamService } from './../../services/exam.service';
import { Exam } from 'src/app/models/exam';
import { CommonFormsComponent } from '../common-forms.component';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-exam-forms',
  templateUrl: './exam-forms.component.html',
  styleUrls: ['./exam-forms.component.css']
})
export class ExamFormsComponent extends CommonFormsComponent<Exam, ExamService> implements OnInit {


  parentSubjects: Subject[] = [];
  childrenSubjects: Subject[] = [];
  errorQuestions: String;

  constructor(service: ExamService,
    protected router: Router,
    protected route: ActivatedRoute) {
    super(service, router, route);
    this.title = 'Exam form';
    this.model = new Exam();
    this.modelName = Exam.name;
    this.redirect = '/exams';
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id: number = +params.get('id');
      if (id) {
        this.service
          .view(id)
          .subscribe(model => {
            this.model = model;
            this.title = `Edit ${this.modelName}`;
            this.loadChildrens();
          });
      }
    });

    this.service.findAllSubjects().subscribe(subjects => this.parentSubjects = subjects.filter(s => !s.parent));
  }

  public create(): void {
    if (this.model.questions.length === 0) {
      this.errorQuestions = 'The exam must have at least one question';
      // Swal.fire('Error in questions', 'The exam must have at least one question', 'error');
      return;
    }
    else {
      this.errorQuestions = undefined;
    }
    this.deleteEmptyQuestion();
    super.create();
  }

  public edit(): void {
    if (this.model.questions.length === 0) {
      //Swal.fire('Error in questions', 'The exam must have at least one question', 'error');
      this.errorQuestions = 'The exam must have at least one question';
      return;
    }
    else {
      this.errorQuestions = undefined;
    }
    this.deleteEmptyQuestion();
    super.edit();
  }

  public loadChildrens(): void {
    this.childrenSubjects = this.model.parentSubject ? this.model.parentSubject.children : [];
  }

  public compareSubject(s1: Subject, s2: Subject): boolean {
    if (s1 === undefined && s2 === undefined) {
      return true;
    }
    return (s1 === null || s2 === null || s1 === undefined || s2 === undefined) ? false : (s1.id === s2.id);
  }

  public addQuestion(): void {
    this.model.questions.push(new Question());
  }

  public assignText(question: Question, event: any): void {
    question.text = event.target.value as string;
    console.log(this.model);
  }

  public deleteQuestion(question: Question): void {
    this.model.questions = this.model.questions.filter(p => question.text !== p.text);
  }

  public deleteEmptyQuestion(): void {
    this.model.questions = this.model.questions.filter(p => p.text != null && p.text.length > 0);
  }
}
