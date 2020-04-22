import { StudentService } from './../../services/student.service';
import { Student } from './../../models/student';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonFormsComponent } from '../common-forms.component';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-students-forms',
  templateUrl: './students-forms.component.html',
  styleUrls: ['./students-forms.component.css'],
})
export class StudentsFormsComponent extends CommonFormsComponent<Student, StudentService> implements OnInit {

  private selectedPhoto: File;

  constructor(
    studentService: StudentService,
    router: Router,
    route: ActivatedRoute
  ) {
    super(studentService, router, route);
    this.title = 'Student form';
    this.model = new Student();
    this.modelName = Student.name;
    this.redirect = '/students';
  }

  public uploadPhoto(event): void {
    this.selectedPhoto = event.target.files[0];
    console.info(this.selectedPhoto);
    if(this.selectedPhoto.type.indexOf('image') < 0){
      this.selectedPhoto = null;
      Swal.fire('New:', `Error the file must be of the image type`, 'error');
    }
  }

  public create(): void {
    if(!this.selectedPhoto) {
      super.create();
    }
    else {
      this.service.createWithPhoto(this.model, this.selectedPhoto).subscribe(
        (student) => {
          console.log(student);
          Swal.fire('New:', `${this.modelName}: ${student.name} created successfully`, 'success');
          this.router.navigate([this.redirect]);
        },
        (err) => {
          console.log(err);
          if (err.status === 400) {
            this.error = err.error;
            console.log(this.error);
          }
        }
      );
    }
  }
  public edit(): void {
    if(!this.selectedPhoto) {
      super.edit();
    }
    else {
      this.service.editWithPhoto(this.model, this.selectedPhoto).subscribe(
        (student) => {
          console.log(student);
          Swal.fire('Edited',`${this.modelName} ${student.name} updated successfully`, 'success');
          this.router.navigate([this.redirect]);
        },
        (err) => {
          console.log(err);
          if (err.status === 400) {
            this.error = err.error;
            console.log(this.error);
          }
        }
      );
    }
  }

}
