import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;

  title = 'Login';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpService,
    public dialog: MatDialog
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        // Validators.pattern(
        //   '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
        // ),
      ]),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    this.http.post(`/auth/login`, this.loginForm.value).subscribe({
      next: (res) => this.responseHandler(res),
      error: (err) => this.errorHandler(err),
      complete: () => this.router.navigate(['/home']),
    });
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

  private responseHandler(res: any): void {
    if (res.accessToken) {
      localStorage.setItem('token', res.accessToken);
    }
  }

  private errorHandler(error: any) {
    this.openDialog('0ms', '0ms', 'Error loging in!', error.statusText);
  }
}
