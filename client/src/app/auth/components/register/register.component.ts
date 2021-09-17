import { HashLocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { AuthService } from '../../services/auth.services';
import { registerAction } from '../../store/actions';

import { isSubmittingSelector } from '../../store/selectors';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true
  form: FormGroup
  submitted: boolean = false
  isSubmitting$: Observable<boolean>

  constructor(
    private router: Router,
    private store: Store,
    private authS: AuthService
  ) {
    this.form = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
  }


  register() {
    const request: RegisterRequestInterface = this.form.value

    this.store.dispatch(registerAction({ request }))
    if (this.form.invalid) {
      return
    }
   /*  this.authS.register(this.form.value).subscribe(
      currentUser => { console.log(currentUser) },
      error => { console.log(error) }
    ) */

    this.submitted = true

  }
}
