import { Generic } from './../models/generic';
import { OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { CommonService } from '../services/common.service';

export abstract class CommonListComponent<E extends Generic, S extends CommonService<E>> implements OnInit {
  title: string;
  list: E[];

  protected modelName: string;

  totalRows = 0;
  totalPerPage = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(protected service: S) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.calculateRange();
  }

  private calculateRange(): void {
    this.service
      .listPageable(this.currentPage.toString(), this.totalPerPage.toString())
      .subscribe((p) => {
        this.list = p.content as E[];
        this.totalRows = p.totalElements;
        this.paginator._intl.itemsPerPageLabel = 'Items per page';
      });
  }

  public pageable(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.totalPerPage = event.pageSize;
    this.calculateRange();
  }

  public delete(e: E): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `Are you sure you want to eliminate the ${e.name} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        this.service.delete(e.id).subscribe(() => {
          this.calculateRange();
          Swal.fire(
            'Deleted',
            `The ${this.modelName}: ${e.name} successfully removed`,
            'success'
          );
        });
      }
    });
  }
}
