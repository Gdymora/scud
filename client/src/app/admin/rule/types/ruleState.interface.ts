import { GetRuleResponseInterface } from "src/app/shared/types/getRuleResponse.interface";
import { RuleInterface } from "src/app/shared/types/rule.interface";

export interface RuleStateInterface {
    isLoading: boolean
    error: string | null
    rule: GetRuleResponseInterface | null
}