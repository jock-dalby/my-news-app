import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  template: `
  <div class="paginator-wrapper">
    <span class="paginator-button" id="prev-button" data-test-id="paginator-prev-button" [ngClass]="{ 'disabled': currentOffset === 0 || disabled }" (click)="onOffsetChange(currentOffset - 1)"><</span>
    <span  data-test-id="paginator-text">Page {{currentOffset + 1}} of {{totalNumberOfPages}}</span>
    <span class="paginator-button" id="next-button" data-test-id="paginator-next-button" [ngClass]="{ 'disabled': currentOffset >= totalNumberOfPages - 1 || disabled }" (click)="onOffsetChange(currentOffset + 1)">></span>
  </div>
  `,
  styleUrls: ['paginator.component.scss']
})
export class PaginatorComponent {
  @Input() totalNumberOfPages: number;
  @Input() currentOffset: number;
  @Input() disabled = false;
  @Output() offsetChange = new EventEmitter<number>()

  onOffsetChange(newOffset: number): void {
    this.currentOffset = newOffset;
    this.offsetChange.emit(newOffset)
  }
}