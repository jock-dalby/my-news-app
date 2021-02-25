import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from 'rxjs/operators'

const DATA_URL = "api/data.json"

interface IDataResult {
  standFirst: string;
  dateCreated: Date;
  thumbnailImage: {
    link?: string,
  },
  domainLinks: {
    link: string;
    name: string;
  }[]
}

export interface IFetchDataResponse {
  results: IDataResult[]
}

@Injectable()
export class StoriesService {
  
  constructor(private http: HttpClient) {}

  private fetchData$(): Observable<IFetchDataResponse> {
    return this.http.get<IFetchDataResponse>(DATA_URL)
  }

  getStories$() {
    return this.fetchData$().pipe(map(data => data.results))
  }
}