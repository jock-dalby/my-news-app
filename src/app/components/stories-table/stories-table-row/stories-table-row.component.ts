import { Component, Input } from '@angular/core';

import { IStoryData } from '../../../services/stories.service';

export const STAND_FIRST_SUFFIX = `Although if you're talking to.`

@Component({
  selector: 'app-stories-table-row',
  templateUrl: './stories-table-row.component.html',
  styleUrls: ['./stories-table-row.component.scss']
})
export class StoriesTableRowComponent {
  standFirstSuffix = STAND_FIRST_SUFFIX;
  @Input() storyData: IStoryData;

  hasImageError = false
}
