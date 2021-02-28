import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, interval, Observable, of } from "rxjs";
import { delay, delayWhen, map, tap } from 'rxjs/operators'

export const STORIES_SERVICE_DATA_URL = "api/data.json"

export interface IStoryData {
  title: string;
  standFirst: string;
  dateCreated: Date;
  thumbnailImage: {
    link?: string,
  },
  domainLinks: {
    link: string;
    name: string;
  }[];
  id: {
    value: string;
    link: string;
  }
}

export interface IFetchDataResponse {
  totalHits: number;
  offset: number;
  pageSize: number;
  results: IStoryData[]
}

export interface IPage {
  offset: number, pageSize: number
}
@Injectable()
export class StoriesService {

  constructor(private http: HttpClient) {}

  dataCache: { [hash: string]: IFetchDataResponse } = {};
  loadingStatesBS: BehaviorSubject<{ [hash: string]: boolean }> = new BehaviorSubject({});

  private fetchData$(page: IPage): Observable<IFetchDataResponse> {
    // Server-side pagination
    // return this.http.get<IFetchDataResponse>(`${DATA_URL}?offset=${page.offset}&pageSize=${page.pageSize}`).pipe(tap(res => {
    //   this.cache[this.getHash(page)] = res;
    // }))

    // Client-side pagination done to dev and demo paginator
    return this.http.get<IFetchDataResponse>(STORIES_SERVICE_DATA_URL).pipe(
      delayWhen(() => page.offset === 0 ? of(undefined) : interval(1000)),
      map(res => {
        return {
          ...res,
          // Because only 20 items in data.json
          totalHits: 20,
          offset: page.offset,
          pageSize: page.pageSize,
          results: res.results.slice(page.offset * page.pageSize, (page.offset + 1) * page.pageSize)
        }
      }),
      tap(res => {
        this.dataCache[this.getHash(page)] = res;
      }))
  }

  getData$(page: IPage): Observable<IFetchDataResponse> {
    const hash = this.getHash(page);
    const cacheValue = this.dataCache[hash];
    if (cacheValue) {
      return of(cacheValue)
    }
    this.updateLoadingState(page, true);
    return this.fetchData$(page).pipe(tap(() => this.updateLoadingState(page, false)))
  }

  getLoadingState(page: IPage): Observable<boolean> {
    return this.loadingStatesBS.pipe(map(loadingStates => loadingStates[this.getHash(page)] || false));
  }

  private getHash(page: IPage): string {
    return JSON.stringify(page);
  }

  private updateLoadingState(page: IPage, loadingState: boolean): void {
    this.loadingStatesBS.next({
      ...this.loadingStatesBS.value,
      [this.getHash(page)]: loadingState
    });
  }

}