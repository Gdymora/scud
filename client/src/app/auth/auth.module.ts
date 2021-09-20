import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { SharedModule } from "../shared/shared.module"
import { RegisterComponent } from "./components/register/register.component"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { StoreModule } from '@ngrx/store'
import { reducer } from "./store/reducers"
import { BackendErrorMessagesModule } from "../shared/modules/backendErrorMessages/backendErrorMessages.module"

const routes: Routes = [
    { path: 'register', component: RegisterComponent }
]
@NgModule({
    declarations: [
        RegisterComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('auth', reducer),
        BackendErrorMessagesModule
    ],

})

export class AuthModule { }