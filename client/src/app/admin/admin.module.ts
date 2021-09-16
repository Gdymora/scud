import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { LoginPageComponent } from './login-page/login-page.component'
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component'
import { SharedModule } from '../shared/shared.module'
import { AuthGuard } from '../shared/guards/auth.guard'
import { UserPageComponent } from './users/user-page/user-page.component'
import { EditUsersPageComponent } from './users/edit-users-page/edit-users-page.component'
import { AddUsersPageComponent } from './users/add-users-page/add-users-page.component'

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    UserPageComponent,
    EditUsersPageComponent,
    AddUsersPageComponent,
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
        ],
      },
    ]),
  ],
})
export class AdminModule {}
