import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { forkJoin } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { Category, Position } from 'src/app/shared/interfaces'
import { CategoryService } from 'src/app/shared/services/category.service'
import { PositionService } from 'src/app/shared/services/position.service'

@Component({
  selector: 'app-edit-positions-pages',
  templateUrl: './edit-positions-pages.component.html',
  styleUrls: ['./edit-positions-pages.component.scss'],
})
export class EditPositionsPagesComponent implements OnInit {
  submitted: boolean = false
  positions: Position
  categories: Category[]
  form: FormGroup

  constructor(
    private route: ActivatedRoute,
    private positionsServices: PositionService,
    private categoriServices: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        mergeMap((params) => {
          const categories = this.categoriServices.getCategoriesAll()
          const positions = this.positionsServices.getPositions(params['id'])
          return forkJoin([categories, positions])
        })
      )
      .subscribe((position) => {
        this.positions = position[1]
        console.log(this.positions)
        this.categories = position[0]['data']

        this.form = new FormGroup({
          category_id: new FormControl(
            this.positions.category_id,
            Validators.required
          ),
          name: new FormControl(this.positions.name, Validators.required),
          article: new FormControl(this.positions.article, Validators.required),
          description: new FormControl(
            this.positions.description,
            Validators.required
          ),
          price: new FormControl(this.positions.price),
          count: new FormControl(this.positions.count),
        })
      })
  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }
    console.log(this.getANewOneIfPropChanged(this.positions, this.form.value))
    if (!this.form.value.price && !this.form.value.count) {
      console.log(23)
      /*  this.positionsServices
        .updatePositions(this.form.value, this.positions.id)
        .subscribe(
          (res) => {
            this.form.reset();
            this.submitted = false;
            //  this.router.navigate(['/admin', 'categories', this.positions.category_id, 'position'])
          },
          (err) => {
            console.log(err.error.message);
            console.log(err.error);
          }
        ); */
    } else if (!this.form.value.price) {
      console.log(13)
    } else if (!this.form.value.count) {
      console.log(130)
    } else {
    }
  }

  getANewOneIfPropChanged(oldForm: any, newForm: any) {
    let variance = []
    for (let prop in newForm) {
      if (newForm[prop] != oldForm[prop]) {
        variance.push(prop)
      }
    }
    return variance
  }
}
