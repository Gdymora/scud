import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { response } from "express";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { environment } from "src/environments/environment";
import { AuthResponseInterface } from "../types/authResponse.interface";
import { LoginRequestInterface } from "../types/loginRequest.interface";
import { RegisterRequestInterface } from "../types/registerRequest.interface";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) { }

    getUser(response: AuthResponseInterface): CurrentUserInterface {
        return response.user
    }

    register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
        return this.http
            .post<AuthResponseInterface>(environment.url + '/auth/register', data)
            .pipe(map(this.getUser))
    }

    login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
        console.log(data)
        return this.http
            .post<AuthResponseInterface>(environment.url + '/auth/login', data)
            .pipe(map(this.getUser))
    }

    getCurrentUser(): Observable<CurrentUserInterface> {
        const url = environment.url + '/user'
        return this.http.get<AuthResponseInterface>(url).pipe(map(this.getUser))
    }

}