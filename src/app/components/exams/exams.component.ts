import { ExamService } from './../../services/exam.service';
import { Component, OnInit } from '@angular/core';
import { CommonListComponent } from '../common-list.component';
import { Exam } from 'src/app/models/exam';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent extends CommonListComponent<Exam, ExamService> implements OnInit {

  constructor(service: ExamService) {
    super(service);
    this.title = 'Exam list';
    this.modelName = Exam.name;
  }

}
