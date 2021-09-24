import { HttpErrorResponse } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { of } from "rxjs"
import { catchError, map, switchMap, tap } from "rxjs/operators"
import { RuleInterface } from "src/app/shared/types/rule.interface"
import { CreateRuleService } from "../../shared/services/createRule.service"
import { createRuleAction, createRuleFailureAction, createRuleSuccessAction } from "../actions/createRule.action"

@Injectable()
export class CreateRuleEffect {

  createRule$ = createEffect(() =>

    this.actions$.pipe(
      ofType(createRuleAction),
      /* если используем  switchMap то обязательно вернуть екшн */
      switchMap(({ ruleInput }) => {
        return this.createRuleService.createRule(ruleInput).pipe(
          map((rule: RuleInterface) => {
            return createRuleSuccessAction({ rule })
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            console.log('er', errorResponse.error)
            return of(createRuleFailureAction({ errors: errorResponse.error.errors }))
          })
        )
      })
    )
  )
  redirectAfterCreate$ = createEffect(
    () =>
      this.actions$.pipe(
        /* если произошло registerSuccessAction то испольняем  tap()*/
        ofType(createRuleSuccessAction),
        tap(({ rule }) => {
          this.router.navigate(['/rule', rule.id])/* отправляем пользователя на домашнюю страницу */
        })
      ),
    { dispatch: false }
  )

  constructor(
    private actions$: Actions,
    private createRuleService: CreateRuleService,
    private router: Router
  ) { }
}