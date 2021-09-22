import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuleComponent } from './rule.component';
import { RouterModule, Routes } from "@angular/router"
import { StoreModule } from '@ngrx/store';
import { reducers } from "./store/reducers"
import { EffectsModule } from '@ngrx/effects';
import { GetRuleEffect } from './store/effects/getRule.effect';
import { RuleService as SharedRuleService } from 'src/app/shared/services/rule.service';

const routes: Routes = [
  { path: ':id', component: RuleComponent },
]

@NgModule({
  declarations: [
    RuleComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('rule', reducers),
    RouterModule.forChild(routes),
    EffectsModule.forFeature([GetRuleEffect])
  ],
  providers: [
    SharedRuleService
  ]
})
export class RuleModule { }
