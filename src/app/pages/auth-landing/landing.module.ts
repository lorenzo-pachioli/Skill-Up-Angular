import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { MaterialModule } from 'src/app/material/material.module';
import { AuthLandingRoutingModule } from './auth-landing-routing.module';



@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AuthLandingRoutingModule
  ]
})
export class LandingModule { }
