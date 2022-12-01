import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInyectorInterceptor implements HttpInterceptor {

	constructor() { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {

		const token = localStorage.getItem('token');

		if (token) {
			request = request.clone({
				headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
			});
		}

		return next.handle(request);
	}
}
