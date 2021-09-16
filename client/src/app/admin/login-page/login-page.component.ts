import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/shared/services/auth.service'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  hide = true
  form: FormGroup
  submitted: boolean = false

  constructor(public auth: AuthService, private router: Router) {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(''),
    })
  }

  ngOnInit(): void {}

  login() {
    if (this.form.invalid) {
      return
    }
    this.submitted = true

    const user = {
      email: this.form.value.email,
      password: this.form.value.password,
    }

    this.auth.login(user).subscribe(
      (res) => {
        this.form.reset
        this.router.navigate(['/admin', 'dashboard'])
        this.submitted = false
      },
      () => {
        this.submitted = false
      }
    )
  }
}
