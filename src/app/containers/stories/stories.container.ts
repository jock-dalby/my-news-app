import { of } from 'rxjs';
import { IFetchDataResponse, IPage } from './../../services/stories.service';
import { IStoryData, StoriesService } from '../../services/stories.service';
import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, share, switchMap } from 'rxjs/operators';

const PAGE_SIZE = 5;
@Component({
  selector: 'app-stories',
  template: `<app-stories-table [page]="pageBS | async" [stories]="stories$ | async" [totalNumberOfPages]="totalNumberOfPages$ | async" (pageChange)="onPageChange($event)"></app-stories-table>`,
})
export class StoriesContainer {
  pageBS = new BehaviorSubject<IPage>({ offset: 0, pageSize: PAGE_SIZE });

  data$: Observable<IFetchDataResponse> = this.pageBS.pipe(switchMap(page => {
    return this.storiesService.getData$(page)
  }), share());

  stories$: Observable<IStoryData[]> = this.data$.pipe(map(res => res.results));
  totalNumberOfPages$: Observable<number> = this.data$.pipe(map(res => res.totalHits / PAGE_SIZE));

  constructor(private storiesService: StoriesService) {}

  onPageChange(offset: number) {
    this.pageBS.next({ offset, pageSize: PAGE_SIZE })
  }
}
