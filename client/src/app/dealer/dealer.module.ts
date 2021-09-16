import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { AuthGuard } from '../shared/guards/auth.guard'
import { SharedModule } from '../shared/shared.module'
import { PositionCategoriesPagesComponent } from './categories/position-categories-pages/position-categories-pages.component'
import { ListOfGoodsComponent } from './list-of-goods/list-of-goods.component'
import { DealerLayoutComponent } from './shared/dealer-layout/dealer-layout.component'
import { CartComponent } from './cart/cart.component'

@NgModule({
  declarations: [
    DealerLayoutComponent,
    ListOfGoodsComponent,
    PositionCategoriesPagesComponent,
    CartComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: DealerLayoutComponent,
        children: [
          { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
          {
            path: 'list-of-goods',
            component: ListOfGoodsComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'categories/:id/position',
            component: PositionCategoriesPagesComponent,
            canActivate: [AuthGuard],
          },
          { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
        ],
      },
    ]),
  ],
})
export class DealerModule {}
