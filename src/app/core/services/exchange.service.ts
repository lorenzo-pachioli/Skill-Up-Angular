import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  exchangeUrl=' https://api.bluelytics.com.ar/v2/latest';

  constructor(
    private http: HttpClient
  ) { }

  public get<Type>(): Observable<Type[]> {
    console.log(this.exchangeUrl)
    return this.http.get<Type[]>(this.exchangeUrl);
  }
}
