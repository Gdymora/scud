import { createReducer, on, Action } from '@ngrx/store'
import { routerNavigationAction } from '@ngrx/router-store'
import { getRuleAction, getRuleSuccessAction, getRuleFailureAction } from './actions/getRule.action'

import { RuleStateInterface } from '../types/ruleState.interface'
/* routerNavigationAction 
@ngrx/router-store предоставляет пять действий навигации, 
которые отправляются в определенном порядке. routerReducer обновляет 
его с последним маршрутизатором состоянием
 данного действиями.

 routerNavigationAction (удаляет данніе 
  перед переходом на новую страницу, полезно для пагинации для плавного перехода)- Во время навигации, прежде чем будут
  запущены какие-либо охранники или резолверы,
 маршрутизатор отправит действие ROUTER_NAVIGATION.
*/

const initialState: RuleStateInterface = {
  data: null,
  isLoading: false,
  error: null
}

const ruleReducer = createReducer(
  initialState,
  on(
    getRuleAction,
    (state): RuleStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    getRuleSuccessAction,
    (state, action): RuleStateInterface => ({
      ...state,
      isLoading: false,
      data: action.rule
    })
  ),
  on(
    getRuleFailureAction,
    (state): RuleStateInterface => ({
      ...state,
      isLoading: false
    })
  ),
  on(routerNavigationAction, (): RuleStateInterface => initialState)
)

export function reducers(state: RuleStateInterface, action: Action) {
  return ruleReducer(state, action)
}
