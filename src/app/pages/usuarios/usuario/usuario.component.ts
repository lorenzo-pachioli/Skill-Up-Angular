import { Component, OnInit, Input } from '@angular/core';
import { APIUser } from 'src/app/core/interfaces/APIUsers';
import { IUser } from 'src/app/core/interfaces/User';

@Component({
  selector: 'ew-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  @Input() user:IUser={
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    points: 0,
    roleId: 0,
    createdAt: '',
    updatedAt: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

  sendARS(){

  }

  sendUSD(){
    
  }

}
