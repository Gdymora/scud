import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http'
import { catchError } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs'
import { PersistanceService } from './services/persistance.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private persistanceService: PersistanceService, private router: Router) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.persistanceService.get('fb-token')

    req = req.clone({
      setHeaders: {
        Authorization: token ? token : '',
      },
    })


    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.persistanceService.logout()
          this.router.navigate(['auth/login'])
        }
        return throwError(error)
      })
    )
  }
}
