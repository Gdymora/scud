import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { AuthService } from '../../services/auth.services';
import { loginAction } from '../../store/actions/login.action.';
import { isSubmittingSelector, validationErrorSelector } from '../../store/selectors';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true
  form: FormGroup
  submitted: boolean = false
  isSubmitting$: Observable<boolean>
  backendErrors$: Observable<BackendErrorsInterface | null>

  constructor(
    private router: Router,
    private store: Store,
    private authS: AuthService
  ) {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.initializeValues()
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorSelector))
  }


  login() {
    const request: RegisterRequestInterface = this.form.value

    this.store.dispatch(loginAction({ request }))
    
    if (this.form.invalid) {
      return
    }
    
   /*  this.authS.login(this.form.value).subscribe(
       currentUser => { console.log(currentUser) },
       error => { console.log(error) }
     ) 
 */
    this.submitted = true

  }
}