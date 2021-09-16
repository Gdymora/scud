import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EditPositionsPagesComponent } from './edit-positions-pages.component'

describe('EditPositionsPagesComponent', () => {
  let component: EditPositionsPagesComponent
  let fixture: ComponentFixture<EditPositionsPagesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPositionsPagesComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPositionsPagesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
