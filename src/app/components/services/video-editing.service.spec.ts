import { TestBed } from '@angular/core/testing';

import { VideoEditingService } from './video-editing.service';

describe('VideoEditingService', () => {
  let service: VideoEditingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoEditingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
