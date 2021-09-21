import { CommonModule } from "@angular/common"
import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { SharedModule } from "../shared/shared.module"
import { RegisterComponent } from "./components/register/register.component"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { StoreModule } from '@ngrx/store'
import { reducer } from "./store/reducers"
import { BackendErrorMessagesModule } from "../shared/modules/backendErrorMessages/backendErrorMessages.module"
import { PersistanceService } from "../shared/services/persistance.service";
import { LoginComponent } from './components/login/login.component'
import { EffectsModule } from "@ngrx/effects"
import { RegisterEffect } from "./store/effects/register.effect"
import { LoginEffect } from "./store/effects/login.effect"
import { GetCurrentUserEffect } from "./store/effects/getCurrentUser.effect"

const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent }
]

@NgModule({
    declarations: [
        RegisterComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('auth', reducer),
        EffectsModule.forFeature([RegisterEffect, LoginEffect, GetCurrentUserEffect]),
        BackendErrorMessagesModule
    ],
    providers: [PersistanceService]

})

export class AuthModule { }