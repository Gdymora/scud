import { ComponentFixture, TestBed } from '@angular/core/testing'

import { EditCategoriesPagesComponent } from './edit-categories-pages.component'

describe('EditCategoriesPagesComponent', () => {
  let component: EditCategoriesPagesComponent
  let fixture: ComponentFixture<EditCategoriesPagesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCategoriesPagesComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCategoriesPagesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
