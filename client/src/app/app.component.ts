import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getCurrentUserAction} from './auth/store/actions/getCurrentUser.action';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(private store: Store) { }
  title = 'stockcart'
  ngOnInit(): void {
    this.store.dispatch(getCurrentUserAction())
  }
}
