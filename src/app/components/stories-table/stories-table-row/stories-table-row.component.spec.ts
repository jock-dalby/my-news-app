import { MOCK_STORY_DATA } from 'src/app/services/stories-table.util';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { STAND_FIRST_SUFFIX, StoriesTableRowComponent } from './stories-table-row.component';
import { PaginatorComponent } from '../../paginator/paginator.component';
import { IStoryData } from './../../../services/stories.service';

describe('StoriesTableRowComponent', () => {
  let component: StoriesTableRowComponent;
  let fixture: ComponentFixture<StoriesTableRowComponent>;
  let element: DebugElement;

  let mockData: IStoryData;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        StoriesTableRowComponent,
        PaginatorComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StoriesTableRowComponent);
    element = fixture.debugElement;
    component = fixture.componentInstance;
    mockData = MOCK_STORY_DATA[0];
    component.storyData = mockData;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  it('should display header', () => {
    const headerElem = element.query(By.css('[data-test-id="stories-table-row-header"]'));
    expect(headerElem.nativeElement.innerHTML).toEqual(mockData.title);
  });

  it('should display date', () => {
    const dateElem = element.query(By.css('[data-test-id="stories-table-row-date"]'));
    expect(dateElem.nativeElement.innerHTML).toEqual('Mar 1, 1996');
  });

  it('should display text', () => {
    const headerElem = element.query(By.css('[data-test-id="stories-table-row-text"]'));
    expect(headerElem.nativeElement.innerHTML).toEqual(`${mockData.standFirst} ${STAND_FIRST_SUFFIX}`);
  });

  it('should display image', () => {
    const imageElem = element.query(By.css('[data-test-id="stories-table-row-image"]'));
    expect(imageElem.nativeElement.getAttribute('src')).toEqual(mockData.thumbnailImage.link);
  });

  it('should display link for each domain link', () => {
    const domainLinkElements = element.queryAll(By.css('[data-test-id="stories-table-row-domain-link"]'));
    expect(domainLinkElements.length).toEqual(2);
    expect(domainLinkElements[0].nativeElement.innerHTML).toEqual(mockData.domainLinks[0].name);
    expect(domainLinkElements[0].nativeElement.getAttribute('href')).toEqual(mockData.domainLinks[0].link);
    expect(domainLinkElements[1].nativeElement.innerHTML).toEqual(mockData.domainLinks[1].name);
    expect(domainLinkElements[1].nativeElement.getAttribute('href')).toEqual(mockData.domainLinks[1].link);
  });
});
