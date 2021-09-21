import {Injectable} from '@angular/core'
import {createEffect, Actions, ofType} from '@ngrx/effects'
import {map, catchError, switchMap} from 'rxjs/operators'
import {of} from 'rxjs'


import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface'
import {PersistanceService} from 'src/app/shared/services/persistance.service'
import {
  getCurrentUserAction,
  getCurrentUserSuccessAction,
  getCurrentUserFailureAction
} from 'src/app/auth/store/actions/getCurrentUser.action'
import { AuthService } from '../../services/auth.services'

@Injectable()
export class GetCurrentUserEffect {
  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrentUserAction),
      switchMap(() => {
        const token = this.persistanceService.get('fb-token')

        if (!token) {
          return of(getCurrentUserFailureAction())
        }

        return this.authService.getCurrentUser().pipe(
          map((currentUser: CurrentUserInterface) => {
            console.log('currentUser',currentUser)
            return getCurrentUserSuccessAction({currentUser})
          }),

          catchError(() => {
            return of(getCurrentUserFailureAction())
          })
        )
      })
    )
  )

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService
  ) {}
}
