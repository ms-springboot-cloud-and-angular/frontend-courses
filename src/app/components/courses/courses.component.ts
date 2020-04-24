import { CourseService } from './../../services/course.service';
import { Course } from './../../models/course';
import { Component, OnInit } from '@angular/core';
import { CommonListComponent } from '../common-list.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent extends CommonListComponent<Course, CourseService> implements OnInit {

  constructor(service: CourseService) {
    super(service);
    this.title = 'Courses list';
    this.modelName = Course.name;
  }

}
