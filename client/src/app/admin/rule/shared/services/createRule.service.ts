import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { RuleInputInterface, SaveRuleInterface } from "src/app/shared/types/rule.interface"
import { environment } from "src/environments/environment"
import { map } from "rxjs/operators"

@Injectable()

export class CreateRuleService {
    constructor(private http: HttpClient) { }


    createRule(ruleInput: RuleInputInterface): Observable<RuleInputInterface> {
        const fulUrl = environment.url + '/rule'
        return this.http.post<SaveRuleInterface>(fulUrl, ruleInput)
            .pipe(
                map((response: SaveRuleInterface) => {
                    return response.rule
                })
            )
    }
}