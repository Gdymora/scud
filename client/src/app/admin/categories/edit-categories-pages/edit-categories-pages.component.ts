import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { switchMap } from 'rxjs/operators'
import { Category } from 'src/app/shared/interfaces'
import { CategoryService } from 'src/app/shared/services/category.service'

@Component({
  selector: 'app-edit-categories-pages',
  templateUrl: './edit-categories-pages.component.html',
  styleUrls: ['./edit-categories-pages.component.scss'],
})
export class EditCategoriesPagesComponent implements OnInit {
  submitted: boolean = false
  category: Category
  form: FormGroup

  constructor(
    private route: ActivatedRoute,
    private catigoriesServices: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          return this.catigoriesServices.getCategories(params['id'])
        })
      )
      .subscribe((categories) => {
        this.category = categories
        this.form = new FormGroup({
          name: new FormControl(this.category.name, Validators.required),
          status: new FormControl(this.category.status, Validators.required),
        })
      })
  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }
    console.log(this.form.value)
    this.catigoriesServices.updateCategories(this.form.value).subscribe(
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
