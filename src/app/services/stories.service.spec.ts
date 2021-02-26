import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from "@angular/core/testing";

import { of } from 'rxjs';
import { first } from 'rxjs/operators';
import { MOCK_STORY_DATA } from './stories-table.util';

import { IFetchDataResponse, IPage, StoriesService, STORIES_SERVICE_DATA_URL } from "./stories.service";

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
    describe('if data is in cache', () => {
      beforeEach(() => {
        storiesService.cache[JSON.stringify(page)] = {
          ...mockResponse,
          totalHits: 100
        }
      })

      it('should get value from cache', () => {
        storiesService.getData$(page).pipe(first()).subscribe(data => {
          expect(data.totalHits).toBe(100)
        })
      })
    });

    describe('if data is not in cache', () => {
      it('should get value from api call', () => {
        storiesService.getData$(page).pipe(first()).subscribe(data => {
          expect(data.totalHits).toBe(mockResponse.totalHits)
        })
      })

      it('should store network response in cache', () => {
        storiesService.getData$(page).pipe(first()).subscribe(() => {
          expect(storiesService.cache[JSON.stringify(page)]).toEqual(mockResponse);
        })
      })
    });
  })
});