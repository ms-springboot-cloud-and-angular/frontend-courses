import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
  imports: [
    AppRoutingModule,
    CommonModule
  ]
})
export class LayoutModule { }
