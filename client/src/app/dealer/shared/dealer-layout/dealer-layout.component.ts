import { Position } from '@angular/compiler'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/shared/services/auth.service'
import { PositionService } from 'src/app/shared/services/position.service'

@Component({
  selector: 'app-dealer-layout',
  templateUrl: './dealer-layout.component.html',
  styleUrls: ['./dealer-layout.component.scss'],
})
export class DealerLayoutComponent implements OnInit {
  showFiller = false
  drawer: any
  constructor(
    public auth: AuthService,
    private router: Router,
    public positionServices: PositionService
  ) {}
  cartPositionCount: any
  ngOnInit(): void {
    this.cartPositionCount = this.positionServices.cartPositions
  }

  logout(event: any) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/admin', 'login'])
  }
}
