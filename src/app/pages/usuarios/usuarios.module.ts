import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios-page/usuarios.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsuariosComponent, ResetPassComponent],
  imports: [CommonModule, UsuariosRoutingModule, MaterialModule, FormsModule, ReactiveFormsModule],
})
export class UsuariosModule {}
