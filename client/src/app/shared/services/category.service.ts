import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { Categories, Category } from '../interfaces'

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategoriesAll(): Observable<Categories> {
    return this.http
      .get<Categories>(`${environment.url}/positioncategorys`)
      .pipe(
        map((res: Categories) => {
          return res
        })
      )
  }

  getCategoriesPageEvent(size: number, number: number) {
    return this.http
      .get<Category>(
        `${environment.url}/positioncategorys?page.size=${size}&page.number=${number}`
      )
      .pipe(
        map((res: Category) => {
          return res
        })
      )
  }

  getDataByFilter(value: string): Observable<Category> {
    return this.http.get<Category>(`${environment.url}/positioncategorys`)
  }

  getCategories(id: number) {
    return this.http
      .get<Category>(`${environment.url}/positioncategorys/${id}`)
      .pipe(
        map((res: Category) => {
          return res
        })
      )
  }

  createCategories(category: Category): Observable<Category> {
    return this.http.post<Category>(
      `${environment.url}/positioncategorys`,
      category
    )
  }

  updateCategories(category: Category): Observable<Category> {
    return this.http.put<Category>(
      `${environment.url}/positioncategorys/${category.id}`,
      category
    )
  }

  remove(id: string) {
    return this.http.delete(`${environment.url}/users/${id}`)
  }
}
