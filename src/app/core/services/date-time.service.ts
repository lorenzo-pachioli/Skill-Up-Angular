import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor() { }

  //2022-12-01T17:01:21.000Z -> 01/12/22
  isoToDate(isoDate:string){
    let date = new Date(isoDate)
    const day=('0'+date.getDate()).slice(-2)
    const month=('0'+(date.getMonth()+1)).slice(-2)
    const year=((date.getFullYear().toString())).slice(-2)

    return `${day}/${month}/${year}`;
  }

  //2022-12-01T17:01:21.000Z -> 14:01
  isoToTime(isoDate:string){
    let date = new Date(isoDate);
    const hours=('0'+date.getHours()).slice(-2);
    const minutes=('0'+date.getMinutes()).slice(-2);

    return `${hours}:${minutes}`;
  }
  
  //2022-12-01T17:01:21.000Z -> 01/12/22 14:01
  isoToDateTime(isoDate:string){
    const time = this.isoToTime(isoDate)
    const date = this.isoToDate(isoDate)

    return `${date} ${time}`;
  }



}
