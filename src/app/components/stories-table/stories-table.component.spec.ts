import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PaginatorComponent } from './../paginator/paginator.component';
import { StoriesTableRowComponent } from './stories-table-row/stories-table-row.component';
import { StoriesTableComponent } from './stories-table.component';
import { MOCK_STORY_DATA } from '../../services/stories-table.util';

describe('StoriesTableComponent', () => {
  let component: StoriesTableComponent;
  let fixture: ComponentFixture<StoriesTableComponent>;
  let element: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        StoriesTableComponent,
        StoriesTableRowComponent,
        PaginatorComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StoriesTableComponent);
    element = fixture.debugElement;
    component = fixture.componentInstance;

    component.stories = MOCK_STORY_DATA;
    component.page = { offset: 0, pageSize: MOCK_STORY_DATA.length }
    component.totalNumberOfPages = MOCK_STORY_DATA.length
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it(`should create a table row for each story`, () => {
    const storyTableRows = element.queryAll(By.css('[data-test-id="stories-table-row-wrapper"]'));
    expect(storyTableRows.length).toEqual(3);
  });

  // TODO: Add test for loadingPage input
});
