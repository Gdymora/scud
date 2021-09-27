import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { GetRuleResponseInterface } from "../types/getRuleResponse.interface";
import { RuleInterface } from "../types/rule.interface";

@Injectable({
    providedIn: 'root',
})

export class RuleService {
    constructor(private http: HttpClient) { }


    getAll(): Observable<GetRuleResponseInterface> {
        const fulUrl = environment.url + '/rule'
        return this.http.get<GetRuleResponseInterface>(fulUrl)
    }

    getId(id: string): Observable<GetRuleResponseInterface> {
        const fulUrl = environment.url + `/rule/${id}`
        return this.http.get<GetRuleResponseInterface>(fulUrl)
    }

    delete(id: string): Observable<{}> {
        const fulUrl = environment.url + `/rule/${id}`
        return this.http.delete<{}>(fulUrl)
    }

}