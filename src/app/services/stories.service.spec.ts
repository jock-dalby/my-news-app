import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from "@angular/core/testing";
import { first } from 'rxjs/operators';

import { of } from 'rxjs';
import { MOCK_STORY_DATA } from './stories-table.util';
import { IFetchDataResponse, IPage, StoriesService } from "./stories.service";

describe('StoriesService', () => {

  let storiesService: StoriesService;
  let httpClient: HttpClient;
  let mockResponse: IFetchDataResponse;
  let page: IPage;

  beforeEach(() => {
    page = {
      offset: 0,
      pageSize: 3
    }
    mockResponse = {
      ...page,
      totalHits: 20,
      results: MOCK_STORY_DATA
    }

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        StoriesService,
        {
          provide: HttpClient,
          useValue: {
            get: () => of(mockResponse)
          }
        }
      ],
    });

    storiesService = TestBed.inject(StoriesService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(storiesService).toBeTruthy();
  });

  describe('getData$', () => {
    describe('if data is in dataCache', () => {
      beforeEach(() => {
        storiesService.dataCache[JSON.stringify(page)] = {
          ...mockResponse,
          totalHits: 100
        }
      })

      it('should get value from dataCache', () => {
        storiesService.getData$(page).pipe(first()).subscribe(data => {
          expect(data.totalHits).toBe(100)
        })
      })
    });

    describe('if data is not in dataCache', () => {
      it('should get value from api call', () => {
        storiesService.getData$(page).pipe(first()).subscribe(data => {
          expect(data.totalHits).toBe(mockResponse.totalHits)
        })
      })

      it('should store api response in dataCache', () => {
        storiesService.getData$(page).pipe(first()).subscribe(() => {
          expect(storiesService.dataCache[JSON.stringify(page)]).toEqual(mockResponse);
        })
      })
    });
  })

  // TODO: add tests for getLoadingState$
});