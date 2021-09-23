import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { currentUserSelector } from 'src/app/auth/store/selectors';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { RuleInterface } from 'src/app/shared/types/rule.Interface';
import { getRuleForm } from '../../shared/classes/getRule.form';
import { Rule } from '../../shared/model/rule';
import { getRuleAction } from '../../store/actions/getRule.action';
import { errorSelector, isLoadingSelector, ruleSelector } from '../../store/selectors';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss']
})
export class RuleComponent implements OnInit, OnDestroy {
  id: string
  rules: Rule[];
  selectedRule: FormGroup;

  rule: RuleInterface | null
  ruleSubscription: Subscription
  isLoAding$: Observable<boolean>
  error$: Observable<string | null>
  isAuthor$: Observable<boolean>
  constructor(private store: Store, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeValues()
    this.initializeListeners()
    this.ruleData()
  }

  ngOnDestroy(): void {
    this.ruleSubscription.unsubscribe()
  }

  initializeListeners(): void {
    this.ruleSubscription = this.store
      .pipe(select(ruleSelector))
      .subscribe((rule: RuleInterface | null) => this.rule = rule)
    /* проверяем создавал ли пользователь єто правило */
    this.isAuthor$ = combineLatest(
      [
        this.store.pipe(select(ruleSelector)),
        this.store.pipe(select(currentUserSelector))
      ]
    ).pipe(
      map(
        ([rule, currentUser]: [
          RuleInterface | null,
          CurrentUserInterface | null
        ]) => {
          if (!rule || !currentUser) {
            return false
          }
          return currentUser.login === rule.rule_name
        }
      )
    )
  }

  initializeValues(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.isLoAding$ = this.store.pipe(select(isLoadingSelector))
    this.error$ = this.store.pipe(select(errorSelector))
    console.log(this.id)
  }

  ruleData(): void {
    this.store.dispatch(getRuleAction({ id: this.id }))
  }


  selectRule(rule: Rule) {
    this.selectedRule = getRuleForm();
  }

  create() {
    this.selectedRule = getRuleForm();
  }

  save(rule: FormGroup) {
    console.log("rule", rule)
  }

}
