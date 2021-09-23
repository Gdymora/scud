import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RuleInterface } from 'src/app/shared/types/rule.Interface';

@Component({
  selector: 'app-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.scss']
})
export class RuleListComponent {

  @Input() vm:RuleInterface;

  @Input() active: boolean;
  @Output() selected: EventEmitter<void> = new EventEmitter<void>();

  select() {
    this.selected.emit();
  }
}