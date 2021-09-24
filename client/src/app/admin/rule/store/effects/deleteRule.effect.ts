import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { map, catchError, switchMap, tap } from 'rxjs/operators'
import { of } from 'rxjs'
import { deleteRuleAction, deleteRuleFailureAction, deleteRuleSuccessAction } from '../actions/deleteRule.action'
import { RuleService as SharedRuleService } from 'src/app/shared/services/rule.service'
import { RuleInterface } from 'src/app/shared/types/rule.interface'
import { Router } from "@angular/router"

@Injectable()

export class DeleteEffect {
    getRule$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteRuleAction),
            switchMap(({ id }) => {
                return this.sharedRuleService.getId(id).pipe(
                    map((rule: RuleInterface) => {
                        return deleteRuleSuccessAction()
                    }),

                    catchError(() => {
                        return of(deleteRuleFailureAction())
                    })
                )
            })
        )
    )

    redirectRuleDelete$ = createEffect(
        () =>
            this.actions$.pipe(
                /* если произошло deleteRuleSuccessAction то испольняем  tap()*/
                ofType(deleteRuleSuccessAction),
                tap(() => {
                    this.router.navigateByUrl('/admin/user')/* отправляем пользователя на домашнюю страницу */
                })
            ),
        { dispatch: false }
    )

    constructor(
        private router: Router,
        private actions$: Actions,
        private sharedRuleService: SharedRuleService) { }
}