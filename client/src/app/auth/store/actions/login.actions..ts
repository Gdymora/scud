import { createAction, props } from '@ngrx/store'
import { ActionTypes } from 'src/app/auth/store/actionTypes'
import { RegisterRequestInterface } from 'src/app/auth/types/registerRequest.interface'
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface'
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface'

export const loginAction = createAction(
  ActionTypes.LOGIN,
  props<{ request: RegisterRequestInterface }>()
)

export const loginSuccessAction = createAction(
  ActionTypes.LOGIN_SUCCESS,
  props<{ currentUser: CurrentUserInterface }>()
)

export const loginFailureAction = createAction(
  ActionTypes.LOGIN_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
)
