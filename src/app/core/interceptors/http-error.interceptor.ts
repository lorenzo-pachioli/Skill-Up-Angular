import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(public dialog: MatDialog) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse | ErrorEvent) => {

        let errorMessage = '';

        if (err instanceof ErrorEvent) {
          // error del lado del cliente
          errorMessage = `Client error: ${err.error.message}`;
        } else {
          // error del lado del servidor
          if (err.url == (environment.api_url + '/users')) { //Error del registro
            errorMessage = `Error en el registro: ${err.error.error}`;
          } else if (err.url == (environment.api_url + '/auth/login')) {
            errorMessage = `Usuario o contraseña incorrecta`;
          } else { //Error generico
            errorMessage = `Server error: ${err.error.status} ${err.error.error}`;
          }
        }

        // llamar al dialog y mostrar el errorMessage
        return throwError(() => {
          this.dialog.open(AlertComponent, {
            width: '400px',
            data: { title: 'Error', content: errorMessage }
          });
        });

      })
    )
  }
}
