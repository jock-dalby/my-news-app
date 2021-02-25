import { IPage } from './../../services/stories.service';
import { IStoryData } from '../../services/stories.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';

const PAGE_SIZE = 5;
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

  identifyItem(_, storyData: IStoryData) {
    return storyData.id.value;
  }
}
