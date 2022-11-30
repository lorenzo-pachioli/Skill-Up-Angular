import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { TituloComponent } from './components/titulo/titulo.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { FormComponent } from './components/form/form.component';



@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    LoaderComponent,
    TituloComponent,
    DialogComponent,
    FormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
