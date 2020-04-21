import { Generic } from './../models/generic';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { CommonService } from '../services/common.service';

export abstract class CommonFormsComponent<E extends Generic, S extends CommonService<E>> implements OnInit {
  title: String;
  model: E;
  error: any;
  protected redirect: string;
  protected modelName: string;

  constructor(
    protected service: S,
    protected router: Router,
    protected route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id: number = +params.get('id');
      if (id) {
        this.service
          .view(id)
          .subscribe((model) => (this.model = model));
      }
    });
  }

  public create(): void {
    this.service.create(this.model).subscribe(
      (model) => {
        console.log(model);
        Swal.fire('New:', `${this.modelName}: ${model.name} created successfully`, 'success');
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

  public edit(): void {
    this.service.edit(this.model).subscribe(
      (model) => {
        console.log(model);
        Swal.fire('Edited',`${this.modelName} ${model.name} updated successfully`, 'success');
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
