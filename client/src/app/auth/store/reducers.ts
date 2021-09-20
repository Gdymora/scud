import { createReducer, on, Action } from '@ngrx/store'

import { AuthStateInterface } from 'src/app/auth/types/authState.interface'
import { registerAction, registerSuccessAction, registerFailureAction } from 'src/app/auth/store/actions/register.actions'
import { loginAction, loginFailureAction, loginSuccessAction } from './actions/login.actions.'


const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: null,
  isLoggedIn: null,
  validdationErrors: null
}

const authReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validdationErrors: null
    })
  ),
  on(
    registerSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser
    })
  ),
  on(
    registerFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validdationErrors: action.errors
    })
  ),
  on(
    loginAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validdationErrors: null
    })
  ),
  on(
    loginSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser
    })
  ),
  on(
    loginFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validdationErrors: action.errors
    })
  )
)

export function reducer(state: AuthStateInterface, action: Action) {
  return authReducer(state, action)
}
