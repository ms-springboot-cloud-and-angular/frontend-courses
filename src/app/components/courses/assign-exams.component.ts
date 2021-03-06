import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { ExamService } from './../../services/exam.service';
import { Exam } from 'src/app/models/exam';
import { CourseService } from './../../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, flatMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-assign-exams',
  templateUrl: './assign-exams.component.html',
  styleUrls: ['./assign-exams.component.css']
})
export class AssignExamsComponent implements OnInit {

  course: Course;
  autocompleteControl = new FormControl();
  examsFIlters: Exam[] = [];
  examsAssigns: Exam[] = [];
  exams: Exam[] = [];
  displayedColumns: string[] = ['name', 'subject', 'delete'];
  displayedExamsColumns: string[] = ['id', 'name', 'subject', 'delete'];
  tabIndex: number = 0;

  dataSource: MatTableDataSource<Exam>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private route: ActivatedRoute, private router: Router, private courseService: CourseService
    , private examService: ExamService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      this.courseService.view(id).subscribe(c => {
        this.course = c;
        this.exams = this.course.exams;
        this.initPaginator();
      });
    });

    this.autocompleteControl.valueChanges.pipe(
      map(value => typeof value === 'string' ? value : value.name),
      flatMap(value => value ? this.examService.filterByName(value) : [])
    ).subscribe(exams => this.examsFIlters = exams);
  }

  private initPaginator(): void {
    this.dataSource = new MatTableDataSource<Exam>(this.exams);
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Rows per page';
  }

  public showExamName(exam?: Exam): string {
    return exam ? exam.name : '';
  }

  public examsSelecteds(event: MatAutocompleteSelectedEvent): void {
    const exam = event.option.value as Exam;
    if (!this.exists(exam.id)) {
      this.examsAssigns = this.examsAssigns.concat(exam);
      console.log(this.examsAssigns);
    }
    else {
      Swal.fire('Error:', `The exam "${exam.name}" is already assigned to the course`, 'error');
    }
    this.autocompleteControl.setValue('');
    event.option.deselect();
    event.option.focus();
  }

  private exists(id: number): boolean {
    let exists = false;
    this.examsAssigns.concat(this.exams).forEach(e => {
      if (id === e.id) {
        exists = true;
      }
    })
    return exists;
  }

  public removeAssignExam(exam: Exam): void {
    this.examsAssigns = this.examsAssigns.filter(e => e.id !== exam.id);
  }

  public assign(): void {
    console.log(this.examsAssigns);
    this.courseService.assignExams(this.course, this.examsAssigns).subscribe(c => {
      this.exams = this.exams.concat(this.examsAssigns);
      this.initPaginator();
      this.examsAssigns = [];
      Swal.fire('Assigned', `Exams successfully assigned to the course ${this.course.name}`, 'success');
      this.tabIndex = 2;
    });
  }

  public deleteExam(exam: Exam): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `Are you sure you want to delete the ${exam.name} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        this.courseService.deleteExam(this.course, exam).subscribe(course => {
          this.exams = this.exams.filter(e => e.id !== exam.id);
          this.initPaginator();
          Swal.fire('Deleted', `Exam "${exam.name}" deleted successfully the course "${course.name}"`, 'success');
        });
      }
    });
  }

}
