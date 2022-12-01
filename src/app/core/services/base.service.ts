import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private http: HttpClient) { }
  
  private AuthHeader():HttpHeaders{
    const token = localStorage.getItem('token')
    return new HttpHeaders({'Authorization': `Bearer ${token}`})
  }

  public get<Type>(url: string, id:number|null):Observable<Type> {
    let _headers:HttpHeaders = this.AuthHeader()
    return this.http.get<Type>( environment.api_url + url + (id?('/'+id):'') , {headers:_headers});
  }
}
