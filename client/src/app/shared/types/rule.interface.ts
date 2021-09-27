
export enum RuleField {
    Id = '_id',
    Rule_name = 'rule_name',
    Day = 'day',
    Hour_first = 'hour_first',
    Hour_the_second = 'hour_the_second'
}
export interface RuleInterface {
    [RuleField.Id]?: string
    [RuleField.Rule_name]: string
    [RuleField.Day]: number[]
    [RuleField.Hour_first]: number[]
    [RuleField.Hour_the_second]: number[]
}

export interface RuleInterfaceModel extends RuleInterface {
    clone(): RuleInterface,
}

export interface RuleInputInterface {
    [RuleField.Rule_name]: string
    [RuleField.Day]: number[]
    [RuleField.Hour_first]: number[]
    [RuleField.Hour_the_second]: number[]
}

export interface SaveRuleInterface {
    rule: RuleInterface
}

