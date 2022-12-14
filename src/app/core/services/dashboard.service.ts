import { Injectable, EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  enviarInfoDashboard(info:String){
    console.log(info);
  }

  saldos = new EventEmitter<string>();

  constructor() { }
}
