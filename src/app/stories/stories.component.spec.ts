import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { StoriesComponent } from './stories.component';
import { StoriesService } from './stories.service';

describe('StoriesComponent', () => {
  let component: StoriesComponent;
  let fixture: ComponentFixture<StoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        StoriesComponent
      ],
      providers: [
        {
          provide: StoriesService,
          useValue: {
            getStories$: () => of([])
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
