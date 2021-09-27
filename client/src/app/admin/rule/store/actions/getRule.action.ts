import { createAction, props } from '@ngrx/store'
import { ActionTypes } from 'src/app/admin/rule/store/actionTypes'
import { GetRuleResponseInterface } from 'src/app/shared/types/getRuleResponse.interface'


export const getRuleAction = createAction(
  ActionTypes.GET_RULE
)

export const getRuleSuccessAction = createAction(
  ActionTypes.GET_RULE_SUCCESS,
  props<{ rule: GetRuleResponseInterface }>()
)

export const getRuleFailureAction = createAction(ActionTypes.GET_RULE_FAILURE)
