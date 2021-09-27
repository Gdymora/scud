import { createReducer, on, Action } from '@ngrx/store'
import { routerNavigationAction } from '@ngrx/router-store'
import { CreateRuleStateInterface } from '../types/createRuleState.interface'
import { createRuleAction, createRuleFailureAction, createRuleSuccessAction } from './actions/createRule.action'

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

const initialState: CreateRuleStateInterface = {
  isSubmitting: false,
  validationErrors: null
}

const createRuleReducer = createReducer(
  initialState,
  on(
    createRuleAction,
    (state): CreateRuleStateInterface => ({
      ...state,
      isSubmitting: true
    })
  ),
  on(
    createRuleSuccessAction,
    (state): CreateRuleStateInterface => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    createRuleFailureAction,
    (state, action): CreateRuleStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })
  ),
  on(routerNavigationAction, (): CreateRuleStateInterface => initialState)
)

export function reducers(state: CreateRuleStateInterface, action: Action) {
  return createRuleReducer(state, action)
}
