import { Component, OnInit } from '@angular/core'
import { PageEvent } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { Subscription } from 'rxjs'
import { Categories, Category } from 'src/app/shared/interfaces'
import { CategoryService } from 'src/app/shared/services/category.service'

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  filterValue: any
  length: number
  pageSize: number
  pageSizeOptions: number[] = [5, 10, 25, 100]
  displayedColumns: string[] = ['position', 'category', 'name', 'update']
  dataSource: MatTableDataSource<Category>

  pSub$: Subscription
  constructor(public categoriServices: CategoryService) {}

  ngOnInit(): void {
    this.pSub$ = this.categoriServices.getCategoriesAll().subscribe(
      (res: Categories) => {
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

  getServerNavigateData(event?: PageEvent) {
    console.log(event)
    this.pSub$ = this.categoriServices
      .getCategoriesPageEvent(event.pageSize, event.pageIndex)
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
    this.categoriServices.getDataByFilter(value).subscribe((response) => {
      //TODO
    })
  }

  ngOnDestroy() {
    if (this.pSub$) {
      this.pSub$.unsubscribe()
    }
  }

  remove(id: number) {
    alert(id)
  }
}
