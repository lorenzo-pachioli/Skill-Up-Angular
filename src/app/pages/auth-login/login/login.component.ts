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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | any;
  loading = false;
  title = 'Login';
  showPassword: boolean = false;

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
        Validators.min(4)
      ]),
    });
  }

  ngOnInit(): void { }

  onSubmit() {
    this.loading = true;
    if (!this.loginForm.valid) {
      this.loading = false;
      return;
    }
    this.http.post(`/auth/login`, this.loginForm.value).subscribe({
      next: (res) => this.responseHandler(res),
      error: () => this.loading = false,
      complete: () => {
        this.loading = false;
        this.router.navigate(['home'])
      },
    });
  }

  private responseHandler(res: any): void {
    if (res.accessToken) {
      localStorage.setItem('token', res.accessToken);
    }
  }

  redirect(route: string): void {
    this.router.navigate([route])
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
