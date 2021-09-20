import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { response } from "express";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { environment } from "src/environments/environment";
import { AuthResponseInterface } from "../types/authResponse.interface";
import { RegisterRequestInterface } from "../types/registerRequest.interface";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) { }

    register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
        return this.http
            .post<AuthResponseInterface>(environment.url + '/auth/register', data)
            .pipe(map((response: AuthResponseInterface) => response.user))
    }

}