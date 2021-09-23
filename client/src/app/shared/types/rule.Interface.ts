
export enum RuleField {
    Id = 'id',
    Rule_name = 'rule_name',
    Day = 'day',
    Hour_first = 'hour_first',
    Hour_the_second = 'hour_the_second',
    Hour_the_first= 'hour_the_first',
}
export interface RuleInterface {
    [RuleField.Id]?: string
    [RuleField.Rule_name]: string
    [RuleField.Day]: number[]
    [RuleField.Hour_first]: number[]
    [RuleField.Hour_the_first]: number[]

}

export interface RuleInterfaceModel extends RuleInterface {
    clone(): RuleInterface,
}