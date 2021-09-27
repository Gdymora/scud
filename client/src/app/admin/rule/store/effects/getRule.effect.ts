import { Injectable } from '@angular/core'
import { createEffect, Actions, ofType } from '@ngrx/effects'
import { map, catchError, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'
import { getRuleAction, getRuleSuccessAction, getRuleFailureAction } from '../actions/getRule.action'
import { RuleService as SharedRuleService } from 'src/app/shared/services/rule.service'
import { RuleInterface } from 'src/app/shared/types/rule.interface'

@Injectable()
export class GetRuleEffect {
  getRule$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getRuleAction),
      switchMap(({ id }) => {
        return this.sharedRuleService.getId(id).pipe(
          map((rule: RuleInterface) => {
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

/*
      ofType(getRuleAction),
      switchMap(({url}) => {
        return this.ruleService.getRule(url).pipe(
          map((rule: GetRuleResponseInterface) => {
            return getRuleSuccessAction({rule})
          }),

          catchError(() => {
            return of(getRuleFailureAction())
          })
        )
      })
    )*/