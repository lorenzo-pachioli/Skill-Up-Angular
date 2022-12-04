import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(public dialog: MatDialog) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(err => {

        let errorMessage = '';
        
        if (err instanceof ErrorEvent) {
          // error del lado del cliente
          errorMessage = `Client error: ${err.error.message}`;
        } else {
          // error del lado del servidor
          errorMessage = `Server error: ${err.status} ${err.message}`;
        }

        // llamar al dialog y mostrar el errorMessage
        return throwError(() => {
          this.dialog.open(DialogComponent, {
            data: { title: 'Error', content: errorMessage }
          });
        });

      })
    )
  }
}