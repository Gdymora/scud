import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Category } from 'src/app/shared/interfaces'
import { CategoryService } from 'src/app/shared/services/category.service'

@Component({
  selector: 'app-add-categories-pages',
  templateUrl: './add-categories-pages.component.html',
  styleUrls: ['./add-categories-pages.component.scss'],
})
export class AddCategoriesPagesComponent implements OnInit {
  submitted: boolean = false
  category: Category
  form: FormGroup

  constructor(
    private catigoriesServices: CategoryService,
    private router: Router
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
    })
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.invalid) {
      return
    }
    console.log(this.form.value)
    this.catigoriesServices.createCategories(this.form.value).subscribe(
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
