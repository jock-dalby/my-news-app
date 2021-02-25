import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';

import { StoriesTableComponent } from './../../components/stories-table/stories-table.component';
import { PaginatorComponent } from './../../components/paginator/paginator.component';
import { StoriesTableRowComponent } from './../../components/stories-table/stories-table-row/stories-table-row.component';
import { MOCK_STORY_DATA } from '../../services/stories-table.util';
import { IFetchDataResponse, StoriesService } from '../../services/stories.service';
import { PAGE_SIZE, StoriesContainer } from './stories.container';

describe('StoriesContainer', () => {
  let component: StoriesContainer;
  let fixture: ComponentFixture<StoriesContainer>;
  let element: DebugElement;

  let mockResponse: IFetchDataResponse;

  beforeEach(async () => {
    mockResponse = {
      totalHits: 3,
      offset: 0,
      pageSize: PAGE_SIZE,
      results: MOCK_STORY_DATA
    }
    await TestBed.configureTestingModule({
      declarations: [
        StoriesContainer,
        StoriesTableComponent,
        StoriesTableRowComponent,
        PaginatorComponent
      ],
      providers: [
        {
          provide: StoriesService,
          useValue: {
            getData$: () => of(mockResponse)
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StoriesContainer);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('data$', () => {
    it('should fetch data', () => {
      component.data$.pipe(first()).subscribe(res => {
        expect(res).toEqual(mockResponse)
      });
    })
  })

  describe('stories$', () => {
    it('should map results', () => {
      component.stories$.pipe(first()).subscribe(res => {
        expect(res).toEqual(mockResponse.results)
      });
    })
  })

  describe('totalNumberOfPages$', () => {
    it('should map calc total number of pages', () => {
      component.totalNumberOfPages$.pipe(first()).subscribe(res => {
        expect(res).toEqual(1)
      });
    })
  })

  describe('onPageChange', () => {
    let spy: jasmine.Spy;

    beforeEach(() => {
      spy = spyOn(component.pageBS, 'next');
    })
    it('should map offSet to pageBS', () => {
      component.onPageChange(42);
      expect(spy).toHaveBeenCalledWith({ offset: 42, pageSize: PAGE_SIZE })
    })
  })
});
