import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from 'rxjs/operators'

const DATA_URL = "api/data.json"

export interface IStoryData {
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
  results: IStoryData[]
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