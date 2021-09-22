import { RuleInterface } from "src/app/shared/types/rule.Interface";

export interface RuleStateInterface {
    isLoading: boolean
    error: string | null
    data: RuleInterface
}