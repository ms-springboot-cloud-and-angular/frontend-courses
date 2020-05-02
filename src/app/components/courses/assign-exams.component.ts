import { ExamService } from './../../services/exam.service';
import { Exam } from 'src/app/models/exam';
import { CourseService } from './../../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-assign-exams',
  templateUrl: './assign-exams.component.html',
  styleUrls: ['./assign-exams.component.css']
})
export class AssignExamsComponent implements OnInit {

  course: Course;
  autocompleteControl = new FormControl();
  examsFIlters: Exam[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private courseService: CourseService
    , private examService: ExamService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      this.courseService.view(id).subscribe(c => this.course = c);
    });

    this.autocompleteControl.valueChanges.pipe(
      map(value => typeof value === 'string' ? value : value.name),
      flatMap(value => value ? this.examService.filterByName(value) : [])
    ).subscribe(exams => this.examsFIlters = exams);
  }

  public showExamName(exam?: Exam): string {
    return exam ? exam.name : '';
  }

}
