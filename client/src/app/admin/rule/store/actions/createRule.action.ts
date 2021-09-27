import { createAction, props } from '@ngrx/store'
import { ActionTypes } from 'src/app/admin/rule/store/actionTypes'
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface'
import { RuleInputInterface, RuleInterface } from 'src/app/shared/types/rule.interface'

export const createRuleAction = createAction(
  ActionTypes.CREATE_RULE,
  props<{ ruleInput: RuleInputInterface }>()
)

export const createRuleSuccessAction = createAction(
  ActionTypes.CREATE_RULE_SUCCESS,
  props<{ rule: RuleInterface }>()
)

export const createRuleFailureAction = createAction(
  ActionTypes.CREATE_RULE_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
)
