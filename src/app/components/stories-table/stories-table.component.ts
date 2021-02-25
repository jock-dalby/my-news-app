import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IPage } from './../../services/stories.service';
import { IStoryData } from '../../services/stories.service';

@Component({
  selector: 'app-stories-table',
  templateUrl: './stories-table.component.html',
  styleUrls: ['./stories-table.component.scss']
})
export class StoriesTableComponent {
  @Input() page: IPage;
  @Input() stories: IStoryData[];
  @Input() totalNumberOfPages: number;

  @Output() pageChange = new EventEmitter<number>()

  identifyItem(_, storyData: IStoryData): string {
    return storyData.id.value;
  }
}
