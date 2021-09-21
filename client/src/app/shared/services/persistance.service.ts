import { Injectable } from '@angular/core'

@Injectable()
export class PersistanceService {

  set(response: any): void {
    if (response) {
      const expData = new Date(
        new Date().getTime() + +response.expires_in * 1000
      )
      try {
        localStorage.setItem('fb-token-exp', expData.toString())
        localStorage.setItem('fb-token', response.access_token)
      } catch (e) {
        console.error('Error saving data from localStorage', e)
      }

    } else {
      localStorage.clear()
    }
  }

  get(key: string): any {
    const expDate = new Date(localStorage.getItem('fb-token-exp') || '{}')

    const isSameTime = (a: Date, b: Date) => {
      return a.getTime() > b.getTime()
    }

    if (isSameTime(new Date(), expDate)) {
      this.logout()
      return null
    }
    try {
      return localStorage.getItem(key)
    } catch (e) {
      console.error('Error getting data from localStorage', e)
      return null
    }
  }
 
  logout() {
    this.set(null)
  }

  isAuthenticated(key: string) {
    return !!this.get(key)
  }
}
