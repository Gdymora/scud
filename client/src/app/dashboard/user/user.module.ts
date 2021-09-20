import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTitleComponent } from './user-title/user-title.component';
import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './user-form/user-form.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminLayoutComponent } from 'src/app/admin/shared/admin-layout/admin-layout.component';

const routes: Routes = [{
  path: '', component: AdminLayoutComponent,
  children: [
    { path: 'user', component: UsersComponent },
  ],


}];

@NgModule({
  declarations: [
    UserTitleComponent,
    UsersComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserModule { }
