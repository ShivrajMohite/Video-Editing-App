import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoEditingService } from '../services/video-editing.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-video-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.scss']
})
export class VideoUploadComponent implements OnInit {
  videoUrl: string | ArrayBuffer | null = null;
  @Output() videoSelected = new EventEmitter<File>();
  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef<HTMLVideoElement>;

  isSlowMotion = false;
  normalPlaybackRate = 1.0; // Normal playback rate
  startTime = 0;
  endTime = 0;

  constructor(
    private videoEditingService: VideoEditingService
  ) { }

  ngOnInit(): void {
    this.getVideosList();
  }

  getVideosList(): void {
    this.videoEditingService.getVideos().subscribe((res) => {
      console.log(res);
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    this.videoSelected.emit(file);

    reader.onload = (e) => {
      this.videoUrl = e.target?.result as string | ArrayBuffer | null;
    };

    reader.readAsDataURL(file);
  }

  applySlowMotion(): void {
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      const videoElement = this.videoPlayer.nativeElement;
      videoElement.playbackRate = 0.25; // Set the playback rate to half speed
      videoElement.play(); // Restart the video to see the effect immediately
      this.isSlowMotion = true;
    }
  }

  applyNormalView(): void {
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      const videoElement = this.videoPlayer.nativeElement;
      videoElement.playbackRate = this.normalPlaybackRate; // Reset to normal playback rate
      videoElement.play(); // Restart the video to see the effect immediately
      this.isSlowMotion = false;
    }
  }

  trimVideo(): void {
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      const videoElement = this.videoPlayer.nativeElement;
      videoElement.currentTime = this.startTime;
      videoElement.play();
      setTimeout(() => {
        videoElement.pause();
        videoElement.currentTime = this.endTime;
      }, (this.endTime - this.startTime) * 1000); // Convert to milliseconds
    }
  }


}
