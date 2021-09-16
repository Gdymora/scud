import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/shared/services/auth.service'

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent {
  showFiller = false
  drawer: any
  constructor(public auth: AuthService, private router: Router) {}

  logout(event: any) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/admin', 'login'])
  }
}
