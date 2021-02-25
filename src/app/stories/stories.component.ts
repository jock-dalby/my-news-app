import { StoriesService } from './stories.service';
import { Component } from '@angular/core';
import { tap } from 'rxjs/operators'

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent {
  title = 'News stories';

  imageErrorsMap = {}

  stories$ = this.storiesService.getStories$();

  constructor(private storiesService: StoriesService) {}

  onImageError(idx: number) {
    this.imageErrorsMap[idx] = true;
  }
}
