import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, share, switchMap } from 'rxjs/operators';

import { IFetchDataResponse, IPage } from './../../services/stories.service';
import { IStoryData, StoriesService } from '../../services/stories.service';

export const PAGE_SIZE = 4;
@Component({
  selector: 'app-stories',
  template: `<app-stories-table [page]="pageBS | async" [stories]="stories$ | async" [totalNumberOfPages]="totalNumberOfPages$ | async" (offsetChange)="onOffsetChange($event)"></app-stories-table>`,
})
export class StoriesContainer {
  pageBS = new BehaviorSubject<IPage>({ offset: 0, pageSize: PAGE_SIZE });

  data$: Observable<IFetchDataResponse> = this.pageBS.pipe(switchMap(page => {
    return this.storiesService.getData$(page)
  }), share());

  stories$: Observable<IStoryData[]> = this.data$.pipe(map(res => res.results));
  totalNumberOfPages$: Observable<number> = this.data$.pipe(map(res => Math.ceil(res.totalHits / PAGE_SIZE)));

  constructor(private storiesService: StoriesService) {}

  onOffsetChange(offset: number): void {
    this.pageBS.next({ offset, pageSize: PAGE_SIZE })
  }
}
