import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoEditingService } from '../services/video-editing.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  public fileName: string = '';

  constructor(
    private videoEditingService: VideoEditingService,
    private http: HttpClient,
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
    this.fileName = file.name;
    
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

  async downloadVideo(): Promise<void> {
    try {
      if (!this.videoUrl) {
        console.error('No video URL available');
        return;
      }

      let blob: Blob;

      if (typeof this.videoUrl === 'string') {
        // Convert Data URL to Blob
        const response = await fetch(this.videoUrl);
        blob = await response.blob();
      } else if (this.videoUrl instanceof ArrayBuffer) {
        // Convert ArrayBuffer to Blob
        blob = new Blob([new Uint8Array(this.videoUrl)], { type: 'video/mp4' });
      } else {
        console.error('Unsupported video URL type');
        return;
      }

      if (this.isSlowMotion) {
        const modifiedBlob = await this.applySlowMotionEffect(blob); // Apply slow-motion effect to the video
        const url = window.URL.createObjectURL(modifiedBlob);

        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = this.fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = this.fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error downloading video:', error);
    }
  }

  private async applySlowMotionEffect(originalBlob: Blob): Promise<Blob> {
    // Example: Simulate slow-motion effect (not real implementation)
    // This is where you would use video editing libraries or server-side processing
    // to apply slow-motion effect to the video.

    return new Promise<Blob>((resolve, reject) => {
      const videoElement = document.createElement('video');
      videoElement.src = URL.createObjectURL(originalBlob);

      videoElement.onloadedmetadata = () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;

        const context = canvas.getContext('2d');
        if (context) {
          context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
          // Simulate slow-motion effect by duplicating frames
          // Adjust playback rate and frame rate as needed
          // For demonstration, just return the original blob
          resolve(originalBlob);
        } else {
          reject('Could not create canvas context');
        }
      };

      videoElement.onerror = (event) => {
        reject(event);
      };

      videoElement.onabort = () => {
        reject('Video loading aborted');
      };

      videoElement.load();
    });
  }


}
