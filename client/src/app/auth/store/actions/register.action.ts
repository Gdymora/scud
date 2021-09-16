import { createAction, props } from "@ngrx/store";
import { RegisterRequestInterface } from "../../types/registerRequest.interface";
import { ActionTypes } from "../actionTypes";

/* Action - один из основных строительных блоков NgRx. 
  Действия выражают уникальные события, 
  происходящие в вашем приложении. От взаимодействия пользователя со страницей, 
  внешнего взаимодействия через сетевые запросы и прямого взаимодействия 
  с API устройства эти и другие события описываются действиями. 
  https://ngrx.io/guide/store/actions
  */

export const registerAction = createAction(
    ActionTypes.REGISTER,
    props<RegisterRequestInterface>())


/* createAction Функция возвращает функцию, которая при вызове возвращает
объект в форме Actionинтерфейса. propsМетод используется
для определения каких - либо дополнительных метаданных,
необходимых для обработки действия. Создатели действий предоставляют
последовательный, безопасный для типов способ создания отправляемого действия.
Вызываем в компоненте: this.store.dispatch(registerAction(this.form.value))
*/