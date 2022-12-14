import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const newAccount = {
  "creationDate": `${new Date()}`,
  "money": 0,
  "isBlocked": false
}

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<any> {
    return this.http.get<any>(environment.api_url + '/accounts/me')
  }

  generateAccount(): Observable<any> {
    return this.http.post<any>(environment.api_url + '/accounts', newAccount)
  }
}
