import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true
  form: FormGroup
  submitted: boolean = false

  constructor(private router: Router) {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.email]),
    })
  }

  ngOnInit(): void { }

  register() {
    if (this.form.invalid) {
      return
    }
    this.submitted = true

    const user = {
      email: this.form.value.email,
      password: this.form.value.password,
    }

  }
}
