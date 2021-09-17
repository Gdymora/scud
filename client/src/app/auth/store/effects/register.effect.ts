import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { map, catchError, switchMap } from 'rxjs/operators'

import {
    registerAction,
    registerSuccessAction,
    registerFailureAction
} from '../actions'

import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface'
import { of } from 'rxjs'
import { AuthService } from '../../services/auth.services'
import { HttpErrorResponse } from '@angular/common/http'

/* В приложении Angular на основе служб компоненты отвечают за взаимодействие 
с внешними ресурсами напрямую через службы. Вместо этого эффекты обеспечивают 
способ взаимодействия с этими сервисами и изоляцию их от компонентов. Эффекты - 
это то, где вы обрабатываете такие задачи, как выборка данных, длительные задачи, 
которые создают несколько событий, и другие внешние взаимодействия, 
при которых вашим компонентам не требуется явное знание этих взаимодействий. */

@Injectable()
export class RegisterEffect {
    register$ = createEffect(() =>
        this.actions$.pipe(
            ofType(registerAction),
            switchMap(({ request }) => {
                return this.authService.register(request).pipe(
                    map((currentUser: CurrentUserInterface) => {
                        console.log('effect', currentUser)
                        return registerSuccessAction({ currentUser: currentUser })
                    }),
                    catchError((errorResponse: HttpErrorResponse) => {
                        console.log('er', errorResponse)
                        return of(registerFailureAction({ errors: errorResponse.error.message }))
                    })
                )
            })
        )
    )

    constructor(private actions$: Actions, private authService: AuthService) { }
}
