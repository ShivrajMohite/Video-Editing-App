import { Component, Input, OnInit } from '@angular/core';
import { VideoEditingService } from '../services/video-editing.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-editing-options',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-editing-options.component.html',
  styleUrl: './video-editing-options.component.scss',
})
export class VideoEditingOptionsComponent implements OnInit {
  @Input() videoFile: File | null = null;

  constructor(private videoEditingService: VideoEditingService) { }

  ngOnInit(): void {
    
  }

  removeBackground() {
    if (this.videoFile) {
      this.videoEditingService.removeBackground(this.videoFile).then(editedFile => {
        // Handle the edited file
      });
    }
  }

  trimVideo() {
    if (this.videoFile) {
      const start = 10; // Example start time
      const end = 20;   // Example end time
      this.videoEditingService.trim(this.videoFile, start, end).then(editedFile => {
        // Handle the edited file
      });
    }
  }

  applySlowMotion() {
    debugger
    if (this.videoFile) {
      this.videoEditingService.applySlowMotion(this.videoFile).then(editedFile => {
        debugger
        // Handle the edited file
      });
    }
  }
}
