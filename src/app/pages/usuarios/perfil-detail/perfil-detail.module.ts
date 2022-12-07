import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilDetailRoutingModule } from './perfil-detail-routing.module';
import { PerfilDetailComponent } from './perfil-detail.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PerfilDetailComponent
  ],
  imports: [
    CommonModule,
    PerfilDetailRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class PerfilDetailModule { }
