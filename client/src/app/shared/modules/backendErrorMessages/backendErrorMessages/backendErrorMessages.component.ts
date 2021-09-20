import {Component, Input, OnInit} from '@angular/core'
import {BackendErrorsInterface} from 'src/app/shared/types/backendErrors.interface'

@Component({
  selector: 'mc-backend-error-messages',
  templateUrl: './backendErrorMessages.component.html',
  styleUrls: ['./backendErrorMessages.components.scss']
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input('backendErrors') backendErrorsProps: BackendErrorsInterface 

  errorMessages: string[]

  ngOnInit(): void {
    console.log('dddd',this.backendErrorsProps)
    this.errorMessages = Object.entries(this.backendErrorsProps).map(
      () => {
        console.log('**** ',this.backendErrorsProps)
        const messages = this.backendErrorsProps
        return `${name} ${messages}`
      }
    )
  }
}
