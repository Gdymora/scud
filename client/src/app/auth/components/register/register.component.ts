import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { registerAction } from '../../store/actions/register.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true
  form: FormGroup
  submitted: boolean = false

  constructor(private router: Router, private store: Store) {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.email]),
    })
  }

  ngOnInit(): void { }

  register() {
    this.store.dispatch(registerAction(this.form.value))
    console.log(this.store.dispatch(registerAction(this.form.value)))
    if (this.form.invalid) {
      return
    }
    this.submitted = true

  }
}
