import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuleComponent } from './components/rule/rule.component';
import { RouterModule, Routes } from "@angular/router"
import { StoreModule } from '@ngrx/store';
import { reducers } from "./store/reducers"
import { EffectsModule } from '@ngrx/effects';
import { GetRuleEffect } from './store/effects/getRule.effect';
import { RuleService as SharedRuleService } from 'src/app/shared/services/rule.service';
import { DeleteEffect } from './store/effects/deleteRule.effect';
import { RuleListComponent } from './components/rule-list/rule-list.component';
import { RuleFormComponent } from './components/rule-form/rule-form.component';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
const routes: Routes = [
  { path: ':id', component: RuleComponent },
]

@NgModule({
  declarations: [
    RuleComponent,
    RuleListComponent,
    RuleFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('rule', reducers),
    RouterModule.forChild(routes),
    EffectsModule.forFeature([GetRuleEffect, DeleteEffect]),
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [
    SharedRuleService
  ]
})
export class RuleModule { }
