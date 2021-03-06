import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { map, catchError, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'
import { getRuleAction, getRuleSuccessAction, getRuleFailureAction } from '../actions/getRule.action'
import { RuleService as SharedRuleService } from 'src/app/shared/services/rule.service'
import { RuleInterface } from 'src/app/shared/types/rule.interface'
import { GetRuleResponseInterface } from 'src/app/shared/types/getRuleResponse.interface'

@Injectable()
export class GetRuleEffect {
  getRule$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getRuleAction),
      switchMap(() => {
        return this.sharedRuleService.getAll().pipe(
          map((rule: GetRuleResponseInterface) => {
            return getRuleSuccessAction({ rule })
          }),

          catchError(() => {
            return of(getRuleFailureAction())
          })
        )
      })
    )
  )

  constructor(private actions$: Actions, private sharedRuleService: SharedRuleService) { }
}
