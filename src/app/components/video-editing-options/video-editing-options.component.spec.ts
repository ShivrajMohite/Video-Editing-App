import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoEditingOptionsComponent } from './video-editing-options.component';

describe('VideoEditingOptionsComponent', () => {
  let component: VideoEditingOptionsComponent;
  let fixture: ComponentFixture<VideoEditingOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoEditingOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoEditingOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
