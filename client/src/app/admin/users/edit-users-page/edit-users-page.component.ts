import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { switchMap } from 'rxjs/operators'
import { Users } from 'src/app/shared/interfaces'
import { UserRoleService } from 'src/app/shared/services/user-role.service'

@Component({
  selector: 'app-edit-users-page',
  templateUrl: './edit-users-page.component.html',
  styleUrls: ['./edit-users-page.component.scss'],
})
export class EditUsersPageComponent implements OnInit {
  submitted: boolean = false
  form: FormGroup
  user: Users
  constructor(
    private route: ActivatedRoute,
    private userRoleServis: UserRoleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params) => {
          return this.userRoleServis.getUser(params['id'])
        })
      )
      .subscribe((user) => {
        console.log(user)
        this.user = user
        this.form = new FormGroup({
          email: new FormControl(this.user.email, Validators.required),
          fio: new FormControl(this.user.fio, Validators.required),
          role_id: new FormControl(this.user.role_id, Validators.required),
          status: new FormControl(this.user.status, Validators.required),
        })
      })
  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }
    this.userRoleServis
      .updateUser({
        ...this.user,
        email: this.form.value.email,
        fio: this.form.value.fio,
        role_id: this.form.value.role_id,
        status: this.form.value.status,
      })
      .subscribe(
        (res) => {
          this.form.reset()
          this.submitted = false
          this.router.navigate(['/admin', 'users'])
        },
        (err) => {
          console.log(err.error.message)
          console.log(err.error)
        }
      )
  }
}
