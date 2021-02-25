import { HttpClientModule } from '@angular/common/http';
import { TestBed } from "@angular/core/testing";
import { StoriesService } from "./stories.service";

describe('StoriesService', () => {

  let storiesService: StoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        StoriesService,
      ],
    });

    storiesService = TestBed.inject(StoriesService);
  });

  it('should be created', () => {
    expect(storiesService).toBeTruthy();
  });
});