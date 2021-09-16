import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { CartPositions, Position, Positions } from '../interfaces'

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  cartPositions: CartPositions[] = []
  totalPrice: number = 0

  constructor(private http: HttpClient) {}

  getPositionAll(): Observable<Positions> {
    return this.http.get<Positions>(`${environment.url}/positions`).pipe(
      map((res: Positions) => {
        return res
      })
    )
  }

  getCategoriesPageEvent(
    categoryId: number,
    size: number,
    number: number
  ): Observable<Positions> {
    return this.http
      .get<Positions>(
        `${environment.url}/positions?search.category_id=${categoryId}&page.size=${size}&page.number=${number}`
      )
      .pipe(
        map((res: Positions) => {
          return res
        })
      )
  }

  getPositions(id: number) {
    return this.http.get<Position>(`${environment.url}/positions/${id}`).pipe(
      map((res: Position) => {
        return res
      })
    )
  }

  getPositionsParams(id: number) {
    return this.http
      .get<Position>(`${environment.url}/positionparams/${id}`)
      .pipe(
        map((res: Position) => {
          return res
        })
      )
  }

  getPositionsCounts(id: number) {
    return this.http
      .get<Position>(`${environment.url}/positioncounts/${id}`)
      .pipe(
        map((res: Position) => {
          return res
        })
      )
  }

  getPositionsPrices(id: number) {
    return this.http
      .get<Position>(`${environment.url}/positionprices/${id}`)
      .pipe(
        map((res: Position) => {
          return res
        })
      )
  }

  getDataByFilter(value: string): Observable<Position> {
    return this.http.get<Position>(`${environment.url}/positions`)
  }

  createPositions(position: Position): Observable<Position> {
    return this.http.post<Position>(`${environment.url}/positions`, position)
  }

  updatePositions(position: Position, id: number): Observable<Position> {
    console.log('this.positions.', id)
    return this.http.put<Position>(
      `${environment.url}/positions/${id}`,
      position
    )
  }

  remove(id: string) {
    return this.http.delete(`${environment.url}/users/${id}`)
  }

  addPositionCart(position: CartPositions) {
    const cartElementIndex = this.cartPositions.findIndex(
      (positions) => positions.id == position.id
    )
    if (cartElementIndex >= 0) {
      this.cartPositions[cartElementIndex].count += +1
    } else {
      position.count = 1
      this.cartPositions.push(position)
    }

    this.totalPrice += +position.price
  }
}
