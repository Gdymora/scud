import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { User } from '../interfaces'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

/*firebase.google.com */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(user: User): Observable<User> {
    return this.http
      .post<User>(`${environment.url}/user/login`, user)
      .pipe(tap(this.setToken))
  }

  private setToken(response: any): any {
    if (response) {
      const expData = new Date(
        new Date().getTime() + +response.expires_in * 1000
      )
      try {
        console.log(response.user.expire, ' ', expData)
        localStorage.setItem('fb-token-exp', expData.toString())
        localStorage.setItem('fb-token', response.access_token)
      } catch (e) {
        console.error('Error saving data from localStorage', e)
        return null
      }

    } else {
      localStorage.clear()
    }
  }

  get token(): any {
    const expDate = new Date(localStorage.getItem('fb-token-exp') || '{}')

    const isSameTime = (a: Date, b: Date) => {
      return a.getTime() > b.getTime()
    }

    if (isSameTime(new Date(), expDate)) {
      this.logout()
      return null
    }
    try {
      return localStorage.getItem('fb-token')
    } catch (e) {
      console.error('Error getting data from localStorage', e)
      return null
    }

  }

  logout() {
    this.setToken(null)
  }

  isAuthenticated() {
    return !!this.token
  }
}
