import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import Swal from 'sweetalert2';
import { SharedService } from './shared.service';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private sharedService: SharedService,
    private authenticationService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        this.sharedService.hideLoader();
        Swal.fire({
          position: 'top-right',
          width: 300,
          icon: 'error',
          text: 'Token Expired! Login Again'
        });
        // auto logout if 401 response returned from api
         this.authenticationService.logout();
      }
      const error = err.error.message || err.statusText;
      return throwError(error);
    }))
  }
}
