import { Component, Input } from '@angular/core';

import { IStoryData } from '../../../services/stories.service';

@Component({
  selector: 'app-stories-table-row',
  templateUrl: './stories-table-row.component.html',
  styleUrls: ['./stories-table-row.component.scss']
})
export class StoriesTableRowComponent {
  @Input() storyData: IStoryData;

  hasImageError = false
}
