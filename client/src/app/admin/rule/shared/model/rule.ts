import { RuleInterfaceModel } from "src/app/shared/types/rule.interface";

export class Rule implements RuleInterfaceModel {

    static createRule(): Rule {
        return new Rule();
    }

    clone(): Rule {
        return new Rule(
            this.id,
            this.rule_name,
            this.day,
            this.hour_first,
            this.hour_the_second,
            this.hour_the_first
        );
    }


    get valid(): boolean {
        return this.rule_name.length > 0 && this.day.length > 0;
    }

    constructor(
        public id: string = '',
        public rule_name: string = '',
        public day: number[] = [],
        public hour_first: number[] = [],
        public hour_the_second: number[] = [],
        public hour_the_first: number[] = []
    ) { }
}