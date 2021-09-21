import { HttpErrorResponse } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { of } from "rxjs"
import { catchError, map, switchMap, tap } from "rxjs/operators"
import { PersistanceService } from "src/app/shared/services/persistance.service"
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface"
import { AuthService } from "../../services/auth.services"
import { loginAction, loginFailureAction, loginSuccessAction } from "../actions/login.actions."

@Injectable()
export class LoginEffect {
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginAction),
            /* если используем  switchMap то обязательно вернуть екшн */
            switchMap(({ request }) => {
                return this.authService.login(request).pipe(
                    map((currentUser: CurrentUserInterface) => {
                        this.persistanceService.set(currentUser)
                        return loginSuccessAction({ currentUser: currentUser })
                    }),
                    catchError((errorResponse: HttpErrorResponse) => {
                        console.log('er', errorResponse.error)
                        return of(loginFailureAction({ errors: errorResponse.error.errors }))
                    })
                )
            })
        )
    )
    redirectAfterSubmit$ = createEffect(
        () =>
            this.actions$.pipe(
                /* если произошло registerSuccessAction то испольняем  tap()*/
                ofType(loginSuccessAction),
                tap(() => {
                    this.router.navigateByUrl('/admin/user')/* отправляем пользователя на домашнюю страницу */
                })
            ),
        { dispatch: false }
    )

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private persistanceService: PersistanceService,
        private router: Router
    ) { }
}