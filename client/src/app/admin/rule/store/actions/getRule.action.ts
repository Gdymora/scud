import { createAction, props } from '@ngrx/store'
import { ActionTypes } from 'src/app/admin/rule/store/actionTypes'
import { RuleInterface } from 'src/app/shared/types/rule.interface'

export const getRuleAction = createAction(
  ActionTypes.GET_RULE,
  props<{ id: string }>()
)

export const getRuleSuccessAction = createAction(
  ActionTypes.GET_RULE_SUCCESS,
  props<{ rule: RuleInterface }>()
)

export const getRuleFailureAction = createAction(ActionTypes.GET_RULE_FAILURE)
