import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;
  let element: DebugElement;

  let prevButton: DebugElement;
  let nextButton: DebugElement;
  let pageText: DebugElement;
  let offsetChangeSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PaginatorComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PaginatorComponent);
    element = fixture.debugElement;
    component = fixture.componentInstance;

    component.totalNumberOfPages = 4;
    component.currentOffset = 0;

    prevButton = element.query(By.css('[data-test-id="paginator-prev-button"]'))
    nextButton = element.query(By.css('[data-test-id="paginator-next-button"]'))
    pageText = element.query(By.css('[data-test-id="paginator-text"]'))

    offsetChangeSpy = spyOn(component.offsetChange, 'emit')

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('when offset is 0', () => {

    it('should disable prev button', () => {
      expect(prevButton.nativeElement.getAttribute('class')).toEqual('paginator-button disabled');
    })

    describe('and next button is clicked', () => {

      beforeEach(() => {
        nextButton.nativeElement.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();
      })

      it('should update currentOffset to 1', () => {
        expect(component.currentOffset).toBe(1)
      })

      it('should emit updated offset', () => {
        expect(offsetChangeSpy).toHaveBeenCalledWith(1)
      })

      it('should display correct page text', () => {
        expect(pageText.nativeElement.innerHTML).toEqual(`Page ${component.currentOffset + 1} of ${component.totalNumberOfPages}`)
      })
    })
  })

  describe('when offset is 3', () => {

    beforeEach(() => {
      component.currentOffset = 3;
      fixture.detectChanges();
    })

    it('should disable next button', () => {
      expect(nextButton.nativeElement.getAttribute('class')).toEqual('paginator-button disabled');
    })

    describe('and prev button is clicked', () => {

      beforeEach(() => {
        prevButton.nativeElement.dispatchEvent(new MouseEvent('click'));
        fixture.detectChanges();
      })

      it('should update currentOffset to 2', () => {
        expect(component.currentOffset).toBe(2)
      })

      it('should emit updated offset', () => {
        expect(offsetChangeSpy).toHaveBeenCalledWith(2)
      })

      it('should display correct page text', () => {
        expect(pageText.nativeElement.innerHTML).toEqual(`Page ${component.currentOffset + 1} of ${component.totalNumberOfPages}`)
      })
    })
  })
});
