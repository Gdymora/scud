import { createFeatureSelector, createSelector } from '@ngrx/store'
import { RuleStateInterface } from '../types/ruleState.interface'

export const ruleFeatureSelector = createFeatureSelector<
  RuleStateInterface
>('rule')
/* лоадер */
export const isLoadingSelector = createSelector(
  ruleFeatureSelector,
  (ruleState: RuleStateInterface) => ruleState.isLoading
)
/* помилки */
export const errorSelector = createSelector(
  ruleFeatureSelector,
  (ruleState: RuleStateInterface) => ruleState.error
)
/* наші дані */
export const ruleSelector = createSelector(
  ruleFeatureSelector,
  (ruleState: RuleStateInterface) => ruleState.rule
)
