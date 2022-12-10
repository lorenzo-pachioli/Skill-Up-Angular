import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { resolve } from 'path';
import { IUser } from 'src/app/core/interfaces/User';
import { HttpService } from 'src/app/core/services/http.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  registerForm: FormGroup | any;
  loading = false;
  title = 'Register';
  conditions = new FormControl(false, Validators.requiredTrue);
  conditionsText = "While using our Site, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to your name ('Personal Information')."

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpService,
    public dialog: MatDialog
  ) {
    this.registerForm = new FormGroup({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.min(4)
      ]),
      conditions: this.conditions
    });
  }

  ngOnInit(): void { }

  onSubmit() {
    this.loading = true;
    if (!this.registerForm.valid) {
      this.loading = false;
      return;
    }

    const newUser = {
      first_name: this.registerForm.value.firstname,
      last_name: this.registerForm.value.lastname,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      roleId: 1,
      points: 0
    }
    this.http.post(`/users`, newUser).subscribe({
      next: (res) => console.log(res),
      error: (err) => this.errorHandler(err),
      complete: () => {
        this.loading = false;
        this.router.navigate(['/auth/login']);
      }
    });
  }

  showPolicyTerms(): void {
    this.openDialogPolicy('0ms', '0ms', 'Terms and conditions', this.conditionsText)
  }

  private openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    title: string,
    content: string
  ): void {
    this.dialog.open(AlertComponent, {
      width: '600px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      data: {
        title,
        content,
      },
    });
  }

  private openDialogPolicy(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    title: string,
    content: string
  ): void {
    this.dialog.open(DialogComponent, {
      width: '600px',
      enterAnimationDuration,
      exitAnimationDuration,
      disableClose: true,
      data: {
        title,
        content,
      },
    }).afterClosed().subscribe(response => {
      if (!response.data) {
        return this.conditions.reset(false);
      }

      this.conditions.setValue(true);
    })
  }

  /*   private responseHandler(res: any): void {
      if (res.id) {
        console.log(res);
        this.createAccount(res.id)
        this.createAccount(res.id)
  
      }
    } */

  private errorHandler(error: any) {
    this.openDialog('0ms', '0ms', 'Error Sign in!', error.statusText);
    this.loading = false;
  }

  /*   private createAccount(userId: number): void {
      const newAccount = {
        "creationDate": `${new Date()}`,
        "money": 0,
        "isBlocked": false,
        "userId": userId
      }
      this.http.post(`/accounts`, newAccount).subscribe({
        next: (res) => res,
        error: (err) => this.errorHandler(err)
      })
    } */

  redirect(route: string): void {
    this.router.navigate([route])
  }
}
