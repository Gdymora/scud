import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { Categories, Category, Position } from 'src/app/shared/interfaces'
import { CategoryService } from 'src/app/shared/services/category.service'
import { PositionService } from 'src/app/shared/services/position.service'

@Component({
  selector: 'app-add-positions-pages',
  templateUrl: './add-positions-pages.component.html',
  styleUrls: ['./add-positions-pages.component.scss'],
})
export class AddPositionsPagesComponent implements OnInit {
  submitted: boolean = false
  form: FormGroup
  pSub$: Subscription
  categories: Category[]

  constructor(
    private positionsServices: PositionService,
    private categoriServices: CategoryService,
    private router: Router
  ) {
    this.form = new FormGroup({
      category_id: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      article: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      count: new FormControl(null, Validators.required),
    })
  }

  ngOnInit(): void {
    this.pSub$ = this.categoriServices.getCategoriesAll().subscribe(
      (res: Categories) => {
        this.categories = res.data
      },
      (error) => {
        console.log(error)
      }
    )
  }
  ngOnDestroy() {
    if (this.pSub$) {
      this.pSub$.unsubscribe()
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }
    console.log(this.form.value)
    this.positionsServices.createPositions(this.form.value).subscribe(
      (res) => {
        this.form.reset()
        this.submitted = false
        this.router.navigate(['/admin', 'dashboard'])
      },
      (err) => {
        console.log(err.error.message)
        console.log(err.error)
      }
    )
  }
}
