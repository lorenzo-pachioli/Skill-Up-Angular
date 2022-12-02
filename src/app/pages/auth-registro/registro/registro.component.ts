import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { MatDialog} from '@angular/material/dialog';





@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  
showForm:boolean=false;
  showDialog:boolean=true;
  registerForm: FormGroup | any
  title = 'Register';
 

  constructor(
    private router:Router,
    private dialogRef:  MatDialog,
    private fb:FormBuilder

  ) { this.registerForm = new FormGroup({
   
    firstname: new FormControl('', [Validators.required]),
      
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email,Validators.pattern(
      '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
    ),]),
    password: new FormControl('', [Validators.required,Validators.pattern(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
    )])
  });
 }
  
  ngOnInit(): void {
  }


  onSubmit(){
    if(!this.registerForm.valid){
      return;
    }
    this.openDialog('0ms', '0ms', 'title', 'content');
    if(this.showForm){}

    localStorage.setItem('user',this.registerForm.value)
    this.router.navigate(['/auth/login'])
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, title: string, content: string): void {
    
    this.dialogRef.open(DialogComponent, {
      width: '600px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      data: {
        title:"Terminos y Condiciones",
        content:"Al acceder y utilizar este servicio, usted acepta y accede a estar obligado por los términos y disposiciones de este acuerdo. Asimismo, al utilizar estos servicios particulares, usted estará sujeto a toda regla o guía de uso correspondiente que se haya publicado para dichos servicios. Toda participación en este servicio constituirá la aceptación de este acuerdo. Si no acepta cumplir con lo anterior, por favor, no lo utilice"
      }
    }).afterClosed().subscribe({
      next: (showForm) => this.response(showForm.data), 
        
    }); this.showForm=true;
  }
  

  private response(showForm:boolean): void {
   localStorage.setItem('showform', showForm.toString())
   
   }
   
   

 }