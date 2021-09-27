import { createFeatureSelector, createSelector } from '@ngrx/store'
import { CreateRuleStateInterface } from '../types/createRuleState.interface'

export const createRuleFeatureSelector = createFeatureSelector<
  CreateRuleStateInterface
>('createRule')

/* лоадер */
export const isSubmittingSelector = createSelector(
  createRuleFeatureSelector,
  (createRuleState: CreateRuleStateInterface) =>
    createRuleState.isSubmitting
)

/* помилки */
export const validationErrorSelector = createSelector(
  createRuleFeatureSelector,
  (createRuleState: CreateRuleStateInterface) => createRuleState.validationErrors
)