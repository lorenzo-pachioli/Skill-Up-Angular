import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  //private _groupId!: string;
  //private _headers!: HttpHeaders;

  constructor(private http: HttpClient) { }

  public get<Type>(url: string): Observable<Type> {
    return this.http.get<Type>(environment.api_url + url);
  }

  public post<Type>(url: string, body: Type): Observable<Type> {
    return this.http.post<Type>(environment.api_url + url, body);
  }

  public put<Type>(url: string, body: Type): Observable<Type> {
    return this.http.put<Type>(environment.api_url + url, body);
  }

  public delete<Type>(url: string): Observable<Type> {
    return this.http.delete<Type>(environment.api_url + url);
  }
}