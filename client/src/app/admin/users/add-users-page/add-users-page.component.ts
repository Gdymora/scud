import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { switchMap } from 'rxjs/operators'
import { Role, Users } from 'src/app/shared/interfaces'
import { UserRoleService } from 'src/app/shared/services/user-role.service'

@Component({
  selector: 'app-add-users-page',
  templateUrl: './add-users-page.component.html',
  styleUrls: ['./add-users-page.component.scss'],
})
export class AddUsersPageComponent implements OnInit {
  submitted: boolean = false
  form: FormGroup
  user: Users
  roles: Role[]

  constructor(
    private route: ActivatedRoute,
    public userRoleServis: UserRoleService,
    private router: Router
  ) {
    this.form = new FormGroup({
      email: new FormControl(null, Validators.required),
      fio: new FormControl(null, Validators.required),
      role_id: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
    })
  }

  ngOnInit(): void {
    this.userRoleServis.getRoleAll().subscribe((res) => {
      this.roles = res
    })
  }

  onSubmit() {
    if (this.form.invalid) {
      return
    }
    console.log(this.form.value)
    /*     this.userRoleServis.createUser(this.form.value)

    ).subscribe(res => {
      this.form.reset()
      this.submitted = false
      this.router.navigate(['/admin', 'users'])
    },
      err => {
        console.log(err.error.message)
        console.log(err.error)
      }

    )
*/
  }
}
