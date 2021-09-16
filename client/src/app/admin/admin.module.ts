import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { LoginPageComponent } from './login-page/login-page.component'
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component'
import { SharedModule } from '../shared/shared.module'
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component'
import { AuthGuard } from '../shared/guards/auth.guard'
import { UserPageComponent } from './users/user-page/user-page.component'
import { EditUsersPageComponent } from './users/edit-users-page/edit-users-page.component'
import { AddUsersPageComponent } from './users/add-users-page/add-users-page.component'
import { AddPositionsPagesComponent } from './positions/add-positions-pages/add-positions-pages.component'
import { EditPositionsPagesComponent } from './positions/edit-positions-pages/edit-positions-pages.component'
import { EditCategoriesPagesComponent } from './categories/edit-categories-pages/edit-categories-pages.component'
import { AddCategoriesPagesComponent } from './categories/add-categories-pages/add-categories-pages.component'
import { PositionCategoriesPagesComponent } from './categories/position-categories-pages/position-categories-pages.component'

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    UserPageComponent,
    DashboardPageComponent,
    EditUsersPageComponent,
    AddUsersPageComponent,
    AddPositionsPagesComponent,
    EditPositionsPagesComponent,
    EditCategoriesPagesComponent,
    AddCategoriesPagesComponent,
    PositionCategoriesPagesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminLayoutComponent,
        children: [
          { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
          { path: 'login', component: LoginPageComponent },
          {
            path: 'dashboard',
            component: DashboardPageComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'users',
            component: UserPageComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'users/:id/edit',
            component: EditUsersPageComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'users-add',
            component: AddUsersPageComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'positions/:id/edit',
            component: EditPositionsPagesComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'positions-add',
            component: AddPositionsPagesComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'categories/:id/edit',
            component: EditCategoriesPagesComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'categories/:id/position',
            component: PositionCategoriesPagesComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'categories-add',
            component: AddCategoriesPagesComponent,
            canActivate: [AuthGuard],
          },
        ],
      },
    ]),
  ],
})
export class AdminModule {}
