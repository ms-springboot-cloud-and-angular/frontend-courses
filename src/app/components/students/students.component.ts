import { Student } from './../../models/student';
import { StudentService } from './../../services/student.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { PageEvent, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  title: string = 'Students list';
  students: Student[];
  totalRows = 0;
  totalPerPage = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private studentService: StudentService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.calculateRange();
  }

  private calculateRange(): void {
    this.studentService
      .listPageable(this.currentPage.toString(), this.totalPerPage.toString())
      .subscribe((p) => {
        this.students = p.content as Student[];
        this.totalRows = p.totalElements;
        this.paginator._intl.itemsPerPageLabel='Students per page';
      });
  }

  public pageable(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.totalPerPage = event.pageSize;
    this.calculateRange();
  }

  public delete(student: Student): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `Are you sure you want to eliminate the student ${student.name} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        this.studentService.delete(student.id).subscribe(() => {
          // this.students = this.students.filter((s) => s !== student);
          this.calculateRange();
          Swal.fire(
            'Deleted',
            `Student ${student.name} successfully removed`,
            'success'
          );
        });
      }
    });
  }
}
