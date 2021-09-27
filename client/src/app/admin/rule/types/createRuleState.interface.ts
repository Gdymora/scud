import { BackendErrorsInterface } from "src/app/shared/types/backendErrors.interface";

export interface CreateRuleStateInterface {
    isSubmitting: boolean
    validationErrors: BackendErrorsInterface | null
}