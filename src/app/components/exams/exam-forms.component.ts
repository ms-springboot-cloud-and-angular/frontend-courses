import { Subject } from './../../models/subject';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ExamService } from './../../services/exam.service';
import { Exam } from 'src/app/models/exam';
import { CommonFormsComponent } from '../common-forms.component';

@Component({
  selector: 'app-exam-forms',
  templateUrl: './exam-forms.component.html',
  styleUrls: ['./exam-forms.component.css']
})
export class ExamFormsComponent extends CommonFormsComponent<Exam, ExamService> implements OnInit {


  parentSubjects: Subject[] = [];
  childrenSubjects: Subject[] = [];

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

  public loadChildrens(): void {
    this.childrenSubjects = this.model.parentSubject ? this.model.parentSubject.children : [];
  }

  public compareSubject(s1: Subject, s2: Subject): boolean {
    if (s1 === undefined && s2 === undefined) {
      return true;
    }
    return (s1 === null || s2 === null || s1 === undefined || s2 === undefined) ? false : (s1.id === s2.id);
  }

}
