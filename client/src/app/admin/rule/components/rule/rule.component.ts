import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { GetRuleResponseInterface } from 'src/app/shared/types/getRuleResponse.interface';
import { RuleInterface } from 'src/app/shared/types/rule.interface';
import { getRuleForm } from '../../shared/classes/getRule.form';
import { Rule } from '../../shared/model/rule';
import { createRuleAction } from '../../store/actions/createRule.action';
import { getRuleAction } from '../../store/actions/getRule.action';
import { errorSelector, isLoadingSelector, ruleSelector } from '../../store/selectors';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss']
})
export class RuleComponent implements OnInit, OnDestroy {

  selectedRule: FormGroup;
  rule: RuleInterface | null
  ruleSubscription: Subscription
  isLoading$: Observable<boolean>
  error$: Observable<string | null>
  rules$: Observable<GetRuleResponseInterface | null>

  dayList = ['Понеділок', 'Вівторок',
    'Середа', 'Четверг', 'П\'ятниця', 'Субота', 'Неділя'];

  constructor(private store: Store, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeValues()
    this.ruleData()
  }

  ngOnDestroy(): void {
    this.ruleSubscription.unsubscribe()
  }

  initializeValues(): void {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    this.rules$ = this.store.pipe(select(ruleSelector))
    console.log(this.rules$)
  }

  ruleData(): void {
    this.store.dispatch(getRuleAction())
  }


  selectRule(rule: RuleInterface) {
    this.selectedRule = getRuleForm();
  }

  deleteRule(rule: RuleInterface) {
    console.log('delete')
  }

  create() {
    this.selectedRule = getRuleForm();
  }

  save(rule: FormGroup) {
    console.log("rule", rule)
    this.store.dispatch(createRuleAction({ ruleInput: rule.value }))
  }

}
