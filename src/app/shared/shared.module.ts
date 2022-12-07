import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { TituloComponent } from './components/titulo/titulo.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';
import { MaterialModule } from '../material/material.module';
import { FooterComponent } from './components/footer/footer.component';
import { AlertComponent } from './components/alert/alert.component';
import { Router, RouterModule } from '@angular/router';
import { ChartComponent } from './components/chart/chart.component';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    LoaderComponent,
    TituloComponent,
    DialogComponent,
    FormComponent,
    TableComponent,
    FooterComponent,
    AlertComponent,
    ChartComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    TableComponent,
    FooterComponent,
    LoaderComponent,
    HeaderComponent,
    DialogComponent,
    SidebarComponent,
    FormComponent,
    ChartComponent,
    TituloComponent
  ],
})
export class SharedModule { }
