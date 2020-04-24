import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from './../../services/course.service';
import { Component, OnInit } from '@angular/core';
import { CommonFormsComponent } from '../common-forms.component';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-courses-forms',
  templateUrl: './courses-forms.component.html',
  styleUrls: ['./courses-forms.component.css'],
})
export class CoursesFormsComponent
  extends CommonFormsComponent<Course, CourseService>
  implements OnInit {
  constructor(
    courseService: CourseService,
    router: Router,
    route: ActivatedRoute
  ) {
    super(courseService, router, route);
    this.title = 'Course form';
    this.model = new Course();
    this.modelName = Course.name;
    this.redirect = '/courses';
  }
}
