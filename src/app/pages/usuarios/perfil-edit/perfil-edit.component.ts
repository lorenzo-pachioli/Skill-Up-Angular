import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'ew-perfil-edit',
  templateUrl: './perfil-edit.component.html',
  styleUrls: ['./perfil-edit.component.scss']
})
export class PerfilEditComponent implements OnInit {

  editUserForm: FormGroup | any;

  userId: number = -1;
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  roleId: number = -1;
  points: number = -1;

  constructor(private http: HttpService) {
    this.editUserForm = new FormGroup({
      first_name: new FormControl('',  [Validators.required, Validators.pattern("^[a-zA-Z]+$"), Validators.minLength(2)]),
      last_name: new FormControl('',  [Validators.required, Validators.pattern("^[a-zA-Z]+$"), Validators.minLength(2)]),
      email: new FormControl('',  [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]),
      password: new FormControl('',  [Validators.required])
    })
  }

  ngOnInit(): void {
    this.http.get('/auth/me').subscribe({
      next: (res: any) => {

        this.userId = res.id;
        this.roleId = res.roleId;
        this.points = res.points;

        this.editUserForm.get('first_name').setValue(res.first_name);
        this.editUserForm.get('last_name').setValue(res.last_name);
        this.editUserForm.get('email').setValue(res.email);
        
      }
    })
  }

  submit():void {
    this.first_name = this.editUserForm.controls.first_name.value;
    this.last_name = this.editUserForm.controls.last_name.value;
    this.email = this.editUserForm.controls.email.value;
    const password = this.editUserForm.controls.password.value;

    this.http.put(`/users/${this.userId}`, {
      "first_name": this.first_name,
      "last_name": this.last_name,
      "email": this.email,
      "password": password,
      "roleId": this.roleId,
      "points": this.points
    }).subscribe({
      next: (res: any) => {
        window.location.reload();
      }
    })
  }

}
