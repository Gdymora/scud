import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AddPositionsPagesComponent } from './add-positions-pages.component'

describe('AddPositionsPagesComponent', () => {
  let component: AddPositionsPagesComponent
  let fixture: ComponentFixture<AddPositionsPagesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPositionsPagesComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPositionsPagesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
