import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { getRuleForm } from '../../shared/classes/getRule.form';
import { Rule } from '../../shared/model/rule';

@Component({
  selector: 'app-rule-form',
  templateUrl: './rule-form.component.html',
  styleUrls: ['./rule-form.component.scss']
})
export class RuleFormComponent implements OnInit {

  @Input() form: FormGroup;
  @Output() save: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  // form!: FormGroup;
  selectedDays: string;
  dayList = ['Понеділок', 'Вівторок',
    'Середа', 'Четверг', 'П\'ятниця', 'Субота', 'Неділя'];


  ngOnInit(): void {
    //this.form = getRuleForm();
  }

  onSave() {
    const day = this.form.value.day.map((data: number[]) => { return data[0] })
    this.form.value.hour_the_first = this.form.value.day.map((data: number[]) => { return data[1] })
    this.form.value.hour_the_second = this.form.value.day.map((data: number[]) => { return data[2] })
    this.form.value.day = day

    this.save.emit(this.form.value);
  }

}
