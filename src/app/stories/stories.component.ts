import { StoriesService } from './stories.service';
import { Component } from '@angular/core';
import { tap } from 'rxjs/operators'

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent {
  title = 'my-news-app';

  imageErrorsMap = {}

  stories$ = this.storiesService.getStories$().pipe(tap(console.log));

  constructor(private storiesService: StoriesService) {}

  onImageError(idx: number) {
    this.imageErrorsMap[idx] = true;
  }
}
