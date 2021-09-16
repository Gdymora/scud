import { AuthStateInterface } from "../types/authState.interface"
import { createReducer, on, Action } from '@ngrx/store'
import { registerAction } from "./actions/register.action"

/* https://ngrx.io/guide/store/reducers
Редукторы в NgRx отвечают за обработку переходов 
из одного состояния в другое в вашем приложении. 
Функции-редукторы обрабатывают эти переходы, определяя,
 какие действия обрабатывать в зависимости от типа действия.

Вступление
Редукторы - это чистые функции в том смысле, что они 
производят одинаковый вывод для заданного ввода. 
Они не имеют побочных эффектов и синхронно обрабатывают каждый переход состояния. 
Каждая функция редуктора принимает последнее Actionот правленное, 
текущее состояние и определяет, следует ли возвращать новое измененное 
состояние или исходное состояние.
*/

const initialState: AuthStateInterface = {
    /* устанавливаете начальное 
    состояние со значениями по 
    умолчанию для требуемых свойств состояния. */
    isSubmitting: false
}

const authReducer = createReducer(
    /* Функция редуктора отвечает за неизменяемую обработку п
    ереходов между состояниями. Создайте функцию-редуктор, 
    которая обрабатывает действия 
    для управления состоянием табло с помощью этой createReducer функции. */
    initialState,
    on(registerAction,
        (state): AuthStateInterface => ({
            ...state,
            isSubmitting: true
        })
    )
)

/* Экспортированная reducerфункция больше не требуется, 
если вы используете компилятор Ivy AOT по умолчанию (или JIT).
 Это необходимо только для компилятора View Engine AOT, 
поскольку вызовы функций там не поддерживаются . */

export function reducer(state: AuthStateInterface, action: Action) {
    return authReducer(state, action);
  }