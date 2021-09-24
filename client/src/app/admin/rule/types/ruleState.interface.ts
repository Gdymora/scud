import { RuleInterface } from "src/app/shared/types/rule.interface";

export interface RuleStateInterface {
    isLoading: boolean
    error: string | null
    data: RuleInterface
}