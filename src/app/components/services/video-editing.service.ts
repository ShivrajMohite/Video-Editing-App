import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideoEditingService {

  private apiKey = 'FFwbEvyq3KyPmTxbbRzVR9q9'; 
  constructor(private http: HttpClient) { }

  removeBackground(video: File): Promise<File> {
    // Logic to remove background using API
    return new Promise((resolve, reject) => {
      // Mock implementation
      setTimeout(() => resolve(video), 2000);
    });
  }

  trim(video: File, start: number, end: number): Promise<File> {
    // Logic to trim video using API
    return new Promise((resolve, reject) => {
      // Mock implementation
      setTimeout(() => resolve(video), 2000);
    });
  }

  applySlowMotion(video: File): Promise<File> {
    // Logic to apply slow motion using API
    return new Promise((resolve, reject) => {
      // Mock implementation
      setTimeout(() => resolve(video), 2000);
    });
  }

  // https://api.unscreen.com/v1.0/videos

  getVideos(): Observable<any> {
    const headers = new HttpHeaders().set('X-Api-Key', this.apiKey);
    return this.http.get<any>('https://api.unscreen.com/v1.0/videos', { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      errorMessage = `A client-side error occurred: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
