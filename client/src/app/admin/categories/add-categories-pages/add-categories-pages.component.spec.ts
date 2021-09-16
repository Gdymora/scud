import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AddCategoriesPagesComponent } from './add-categories-pages.component'

describe('AddCategoriesPagesComponent', () => {
  let component: AddCategoriesPagesComponent
  let fixture: ComponentFixture<AddCategoriesPagesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCategoriesPagesComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCategoriesPagesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
