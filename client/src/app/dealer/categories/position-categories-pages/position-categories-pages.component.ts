import { Component, OnInit } from '@angular/core'
import { PageEvent } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { ActivatedRoute, Router } from '@angular/router'
import { forkJoin, Subscription } from 'rxjs'
import { mergeMap, switchMap } from 'rxjs/operators'
import {
  Positions,
  Position,
  Categories,
  Category,
  CartPositions,
} from 'src/app/shared/interfaces'
import { CategoryService } from 'src/app/shared/services/category.service'
import { PositionService } from 'src/app/shared/services/position.service'

@Component({
  selector: 'app-position-categories-pages',
  templateUrl: './position-categories-pages.component.html',
  styleUrls: ['./position-categories-pages.component.scss'],
})
export class PositionCategoriesPagesComponent implements OnInit {
  filterValue: any
  length: number
  pageSize: number
  pageSizeOptions: number[] = [5, 10, 25, 100]
  displayedColumns: string[] = [
    'position',
    'article',
    'category',
    'name',
    'description',
    'price',
    'count',
    'update',
  ]
  categories: string
  dataSource: MatTableDataSource<Position>
  pSubIn$: Subscription
  pSub$: Subscription

  constructor(
    private route: ActivatedRoute,
    private positionServices: PositionService,
    private categoriesServices: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pSubIn$ = this.route.params
      .pipe(
        mergeMap((params) => {
          const categories = this.categoriesServices.getCategories(params['id'])
          const positions = this.positionServices.getCategoriesPageEvent(
            params['id'],
            10,
            0
          )
          return forkJoin([categories, positions])
        })
      )
      .subscribe(
        (position: any) => {
          console.log(position)
          this.categories = position[0].name
          this.length = position[1].page.total
          this.pageSize = position[1].page.size
          this.dataSource = new MatTableDataSource(position[1].data)
        },
        (error) => {
          console.log(error)
        }
      )
  }

  getServerNavigateData(event?: PageEvent) {
    this.pSub$ = this.route.params
      .pipe(
        switchMap((params) => {
          return this.positionServices.getCategoriesPageEvent(
            params['id'],
            event.pageSize,
            event.pageIndex
          )
        })
      )
      .subscribe(
        (res: any) => {
          console.log(res)
          this.length = res.page.total
          this.pageSize = res.page.size
          this.dataSource = new MatTableDataSource(res.data)
        },
        (error) => {
          console.log(error)
        }
      )
  }
  filterProduct(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase()
    this.positionServices.getDataByFilter(value).subscribe((response) => {
      //TODO
    })
  }

  ngOnDestroy() {
    if (this.pSubIn$) {
      this.pSubIn$.unsubscribe()
    }
    if (this.pSub$) {
      this.pSub$.unsubscribe()
    }
  }

  addCart(position: CartPositions) {
    console.log(position)
    this.positionServices.addPositionCart(position)
  }
}
