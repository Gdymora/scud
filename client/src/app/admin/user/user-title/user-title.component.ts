import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-user-tile',
  templateUrl: './user-title.component.html',
  styleUrls: ['./user-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTitleComponent {
  @Input() vm: {
    name: string;
    lastName: string;
    tags: string[];
  };
  @Input() active: boolean;
  @Output() selected: EventEmitter<void> = new EventEmitter<void>();

  select() {
    this.selected.emit();
  }
}
