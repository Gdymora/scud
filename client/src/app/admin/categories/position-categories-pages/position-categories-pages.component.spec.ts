import { ComponentFixture, TestBed } from '@angular/core/testing'

import { PositionCategoriesPagesComponent } from './position-categories-pages.component'

describe('PositionCategoriesPagesComponent', () => {
  let component: PositionCategoriesPagesComponent
  let fixture: ComponentFixture<PositionCategoriesPagesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PositionCategoriesPagesComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionCategoriesPagesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
