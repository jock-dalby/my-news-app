import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  template: `
  <div class="paginator-wrapper">
    <span class="paginator-button" id="prev-button" [ngClass]="{ 'disabled': currentOffset === 0 }" (click)="pageChange.emit(currentOffset - 1)"><</span>
    <span class="paginator-button" [ngClass]="{ 'disabled': currentOffset === totalNumberOfPages - 1 }" (click)="pageChange.emit(currentOffset + 1)">></span>
  </div>
  `,
  styleUrls: ['paginator.component.scss']
})
export class PaginatorComponent {
  @Input() totalNumberOfPages: number;
  @Input() currentOffset: number;
  @Output() pageChange = new EventEmitter<number>()
}