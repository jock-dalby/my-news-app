import { StoriesTableRowComponent } from './stories-table-row/stories-table-row.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { StoriesTableComponent } from './stories-table.component';
import { StoriesService } from '../../services/stories.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MOCK_STORY_DATA } from './stories-table.util';

describe('StoriesTableComponent', () => {
  let component: StoriesTableComponent;
  let fixture: ComponentFixture<StoriesTableComponent>;
  let element: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        StoriesTableComponent,
        StoriesTableRowComponent
      ],
      providers: [
        {
          provide: StoriesService,
          useValue: {
            getStories$: () => of(MOCK_STORY_DATA)
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StoriesTableComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it(`should create a table row for each story`, () => {
    const storyTableRows = element.queryAll(By.css('[data-test-id="stories-table-row-wrapper"]'));
    expect(storyTableRows.length).toEqual(3);
  });
});
