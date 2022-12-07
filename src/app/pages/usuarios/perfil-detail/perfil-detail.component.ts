import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ew-perfil-detail',
  templateUrl: './perfil-detail.component.html',
  styleUrls: ['./perfil-detail.component.scss']
})
export class PerfilDetailComponent implements OnInit {
  public perfil: any = [];
  public user: any = [];

  constructor(private userService:UsersService) { }

  ngOnInit(): void {
    // this.traerUser();
    this.traerLogin();    
  }
  
  traerLogin(){
    this.userService.get('http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/auth/me').subscribe(respuesta=> {
      this.perfil = respuesta;
      console.log(respuesta)
    })
  }
}
//   traerUser(){
//     this.userService.get('http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/users/2328').subscribe
//     (respuesta => {
//       this.perfil = respuesta;
//       console.log(respuesta)
//     })
//   }

//   traerLogin(){
//     this.userService.get('http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/auth/me').subscribe
//     (respuesta => {
//       this.user = respuesta;
//       console.log(respuesta)
//     })
//   