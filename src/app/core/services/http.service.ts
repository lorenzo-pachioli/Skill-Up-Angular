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

  private AuthHeader():HttpHeaders{
    const token = localStorage.getItem('token')
    return new HttpHeaders({'Authorization': `Bearer ${token}`})
  }

  public get<Type>(url: string, activateHeader:boolean = false ):Observable<Type> {
    let _headers:HttpHeaders = this.AuthHeader()
    return this.http.get<Type>( environment.api_url+url, activateHeader ? { headers: _headers }: {});
  }
  
  public post<Type>(url: string, body: Type, activateHeader:boolean = false ):Observable<Type> {
    let _headers:HttpHeaders = this.AuthHeader()
    return this.http.post<Type>( environment.api_url+url, body, activateHeader ? { headers: _headers }: {});
  }

  public put<Type>(url: string, body: Type, activateHeader:boolean = false ):Observable<Type> {
    let _headers:HttpHeaders = this.AuthHeader()
    return this.http.put<Type>( environment.api_url+url, body, activateHeader ? { headers: _headers }: {});
  }

  public delete<Type>(url: string, activateHeader:boolean = false ):Observable<Type> {
    let _headers:HttpHeaders = this.AuthHeader()
    return this.http.delete<Type>( environment.api_url+url, activateHeader ? { headers: _headers }: {});
  }
}