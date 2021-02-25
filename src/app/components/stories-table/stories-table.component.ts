import { IStoryData, StoriesService } from '../../services/stories.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stories-table',
  templateUrl: './stories-table.component.html',
  styleUrls: ['./stories-table.component.scss']
})
export class StoriesTableComponent {
  stories$: Observable<IStoryData[]> = this.storiesService.getStories$();

  constructor(private storiesService: StoriesService) {}
}
