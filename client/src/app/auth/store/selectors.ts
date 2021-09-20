import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AuthStateInterface } from 'src/app/auth/types/authState.interface'

export const authFeatureSelector = createFeatureSelector<
  AuthStateInterface
>('auth')

export const isSubmittingSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.isSubmitting
)

export const validationErrorSelector = createSelector(
  authFeatureSelector,
  (authState: AuthStateInterface) => authState.validdationErrors
)

/* Селекторы - это чистые функции, используемые для получения 
фрагментов состояния хранилища. @ ngrx/store предоставляет 
несколько вспомогательных функций для оптимизации этого выбора. 
Селекторы предоставляют множество функций при выборе срезов состояния:

При использовании createSelectorи createFeatureSelector 
функция @ngrx/store отслеживает последние аргументы ,
 в которых ваша функция селектора была вызвана. 
 Поскольку селекторы являются чистыми функциями , 
 последний результат может быть возвращен при совпадении аргументов
  без повторного вызова функции селектора. Это может обеспечить 
  повышение производительности, особенно с селекторами, 
  выполняющими дорогостоящие вычисления. 
Эта практика известна как мемоизация . */