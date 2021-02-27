import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map, tap } from 'rxjs/operators'

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

  cache = {};

  private fetchData$(page: IPage): Observable<IFetchDataResponse> {
    // Server-side pagination
    // return this.http.get<IFetchDataResponse>(`${DATA_URL}?offset=${page.offset}&pageSize=${page.pageSize}`).pipe(tap(res => {
    //   this.cache[JSON.stringify(page)] = res;
    // }))

    // Client-side pagination done to dev and demo paginator
    return this.http.get<IFetchDataResponse>(STORIES_SERVICE_DATA_URL).pipe(
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
        this.cache[JSON.stringify(page)] = res;
      }))
  }

  getData$(page: IPage): Observable<IFetchDataResponse> {
    const cacheValue = this.cache[JSON.stringify(page)];
    if (cacheValue) {
      return of(cacheValue)
    }
    return this.fetchData$(page)
  }

}