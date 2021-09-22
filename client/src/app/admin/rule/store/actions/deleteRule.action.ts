import { createAction, props } from '@ngrx/store'
import { ActionTypes } from 'src/app/admin/rule/store/actionTypes'

export const deleteRuleAction = createAction(
    ActionTypes.DELETE_RULE,
    props<{ id: string }>()
)

export const deleteRuleSuccessAction = createAction(
    ActionTypes.DELETE_RULE_SUCCESS
)

export const deleteRuleFailureAction = createAction(
    ActionTypes.DELETE_RULE_FAILURE
)
