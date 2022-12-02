import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor() { }

  isoToDate(isoDate:string){
    let date = new Date(isoDate);
    const day=('0'+date.getDay()).slice(-2);
    const month=('0'+date.getMonth()+1).slice(-2);
    const year=((date.getFullYear().toString())).slice(-2);

    return `${day}/${month}/${year}`;
  }

  isoToTime(isoDate:string){
    let date = new Date(isoDate);
    const hours=('0'+date.getHours()).slice(-2);
    const minutes=('0'+date.getMinutes()).slice(-2);

    return `${hours}:${minutes}`;
  }

  isoToDateTime(isoDate:string){
    const time = this.isoToTime(isoDate)
    const date = this.isoToDate(isoDate)

    return `${date} ${time}`;
  }
}
