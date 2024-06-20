import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VideoUploadComponent } from './components/video-upload/video-upload.component';
import { VideoEditingOptionsComponent } from './components/video-editing-options/video-editing-options.component';
import { HttpClientModule } from '@angular/common/http';
import { VideoEditingService } from './components/services/video-editing.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    VideoUploadComponent,
    VideoEditingOptionsComponent,
    HttpClientModule,
    FormsModule
  ],
  providers: [VideoEditingService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'video-editing-app';

  selectedVideoFile: File | null = null;

  onVideoSelected(file: File) {
    this.selectedVideoFile = file;
  }
}
