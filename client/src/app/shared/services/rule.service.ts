import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { GetRuleResponseInterface } from "../types/getRuleResponse.Interface";
import { RuleInterface } from "../types/rule.Interface";

@Injectable({
    providedIn: 'root',
})

export class RuleService {
    constructor(private http: HttpClient) { }


    getAll(): Observable<RuleInterface> {
        const fulUrl = environment.url + '/rule'
        return this.http.get<GetRuleResponseInterface>(fulUrl)
            .pipe(
                map((response: GetRuleResponseInterface) => {
                    return response.rule
                })
            )
    }

    getId(id: string): Observable<RuleInterface> {
        const fulUrl = environment.url + `/rule/${id}`
        return this.http.get<GetRuleResponseInterface>(fulUrl)
            .pipe(
                map((response: GetRuleResponseInterface) => {
                    return response.rule
                })
            )
    }

    delete(id: string): Observable<{}> {
        const fulUrl = environment.url + `/rule/${id}`
        return this.http.delete<{}>(fulUrl)
    }

}